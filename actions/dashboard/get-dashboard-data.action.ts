"use server";

import { auth } from "@/lib/auth";
import { budgetItemsService } from "@/services/firebase/budgets/budget-items.service";
import { budgetsService } from "@/services/firebase/budgets/budgets.service";
import { clientsService } from "@/services/firebase/clients/clients.service";
import { DashboardData, DashboardPeriod, RankPoint } from "@/types/dashboard";
import { buildBuckets, getPeriodRange, inRange, percentDelta } from "@/utils/functions/dashboard";

const sum = (list: { total: number }[]) => list.reduce((acc, b) => acc + (b.total ?? 0), 0);

function topN(map: Map<string, RankPoint>, n: number, by: "value" | "count" = "value"): RankPoint[] {
  return [...map.values()]
    .sort((a, b) => (by === "value" ? b.value - a.value : (b.count ?? 0) - (a.count ?? 0)))
    .slice(0, n);
}

export async function getDashboardData(period: DashboardPeriod): Promise<DashboardData> {
  const userLogged = await auth();
  if (!userLogged?.user?.id) throw new Error("Não autenticado");

  const userId = userLogged.user.id;
  const range = getPeriodRange(period);

  // Poucos documentos por usuário: busca tudo (índices já existentes) e agrega em memória
  const [allBudgets, allClients] = await Promise.all([
    budgetsService.getBudgets(userId),
    clientsService.getClients(userId),
  ]);

  const budgets = allBudgets.filter((b) => inRange(b.created_at, range.start, range.end));
  const prevBudgets =
    range.prevStart !== null && range.prevEnd !== null
      ? allBudgets.filter((b) => inRange(b.created_at, range.prevStart, range.prevEnd as number))
      : [];

  const newClients = allClients.filter((c) => inRange(c.created_at, range.start, range.end)).length;
  const prevNewClients =
    range.prevStart !== null && range.prevEnd !== null
      ? allClients.filter((c) => inRange(c.created_at, range.prevStart, range.prevEnd as number)).length
      : 0;

  const hasPrev = range.prevStart !== null;

  const revenue = sum(budgets);
  const prevRevenue = sum(prevBudgets);
  const avgTicket = budgets.length ? revenue / budgets.length : 0;
  const prevAvgTicket = prevBudgets.length ? prevRevenue / prevBudgets.length : 0;

  // Série temporal
  const firstMs = allBudgets.length
    ? Math.min(...allBudgets.map((b) => new Date(b.created_at as string).getTime()))
    : null;
  const { granularity, keys, keyOf } = buildBuckets(period, range, firstMs);
  const buckets = new Map(keys.map((k) => [k.key, { label: k.label, total: 0, count: 0 }]));

  for (const b of budgets) {
    const bucket = buckets.get(keyOf(new Date(b.created_at as string).getTime()));
    if (bucket) {
      bucket.total += b.total ?? 0;
      bucket.count += 1;
    }
  }

  // Rankings
  const clientsMap = new Map<string, RankPoint>();
  const statesMap = new Map<string, RankPoint>();

  for (const b of budgets) {
    const name = b.client_name || "Sem nome";
    const c = clientsMap.get(b.client_id) ?? { name, value: 0, count: 0 };
    c.value += b.total ?? 0;
    c.count = (c.count ?? 0) + 1;
    clientsMap.set(b.client_id, c);

    const uf = (b.client_state || "N/I").toUpperCase();
    const s = statesMap.get(uf) ?? { name: uf, value: 0 };
    s.value += 1;
    statesMap.set(uf, s);
  }

  // Itens mais orçados (agrupados por nome, ignorando caixa)
  const items = await budgetItemsService.getItemsByBudgetIds(budgets.map((b) => b.id));
  const itemsMap = new Map<string, RankPoint>();

  for (const it of items) {
    const key = it.name.trim().toLowerCase();
    const cur = itemsMap.get(key) ?? { name: it.name.trim(), value: 0, count: 0 };
    cur.value += it.quantity * it.value;
    cur.count = (cur.count ?? 0) + it.quantity;
    itemsMap.set(key, cur);
  }

  // UFs: top 5 + "Outros"
  const states = topN(statesMap, 99);
  const byState =
    states.length > 5
      ? [...states.slice(0, 5), { name: "Outros", value: states.slice(5).reduce((a, s) => a + s.value, 0) }]
      : states;

  return {
    period,
    compareLabel: range.compareLabel,
    kpis: {
      budgets: { value: budgets.length, delta: hasPrev ? percentDelta(budgets.length, prevBudgets.length) : null },
      revenue: { value: revenue, delta: hasPrev ? percentDelta(revenue, prevRevenue) : null },
      avgTicket: { value: avgTicket, delta: hasPrev ? percentDelta(avgTicket, prevAvgTicket) : null },
      newClients: { value: newClients, delta: hasPrev ? percentDelta(newClients, prevNewClients) : null },
    },
    totalClients: allClients.length,
    series: [...buckets.values()],
    seriesGranularity: granularity,
    topClients: topN(clientsMap, 5),
    topItems: topN(itemsMap, 5),
    byState,
    hasData: budgets.length > 0,
  };
}
