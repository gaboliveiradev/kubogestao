import { DashboardPeriod } from "@/types/dashboard";

// Brasília: UTC-3 fixo (sem horário de verão). O servidor (Vercel) roda em UTC,
// então os limites de "hoje/ontem" precisam ser calculados nesse fuso.
const BRT_OFFSET_MS = -3 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

/** Início (00:00 BRT) do dia que contém `date`, em timestamp UTC. */
export function startOfDayBRT(date: Date): number {
  const shifted = date.getTime() + BRT_OFFSET_MS;
  return Math.floor(shifted / DAY_MS) * DAY_MS - BRT_OFFSET_MS;
}

export type PeriodRange = {
  start: number | null;
  end: number;
  prevStart: number | null;
  prevEnd: number | null;
  compareLabel: string | null;
};

export function getPeriodRange(period: DashboardPeriod, now = new Date()): PeriodRange {
  const today = startOfDayBRT(now);
  const nowMs = now.getTime() + 1; // +1ms: inclui o instante atual

  switch (period) {
    case "today":
      return { start: today, end: nowMs, prevStart: today - DAY_MS, prevEnd: today, compareLabel: "vs. ontem" };
    case "yesterday":
      return { start: today - DAY_MS, end: today, prevStart: today - 2 * DAY_MS, prevEnd: today - DAY_MS, compareLabel: "vs. anteontem" };
    case "7d":
      return { start: today - 6 * DAY_MS, end: nowMs, prevStart: today - 13 * DAY_MS, prevEnd: today - 6 * DAY_MS, compareLabel: "vs. 7 dias anteriores" };
    case "30d":
      return { start: today - 29 * DAY_MS, end: nowMs, prevStart: today - 59 * DAY_MS, prevEnd: today - 29 * DAY_MS, compareLabel: "vs. 30 dias anteriores" };
    default:
      return { start: null, end: nowMs, prevStart: null, prevEnd: null, compareLabel: null };
  }
}

export function inRange(iso: string | undefined, start: number | null, end: number): boolean {
  if (!iso) return false;
  const t = new Date(iso).getTime();
  return (start === null || t >= start) && t < end;
}

export function percentDelta(current: number, previous: number): number | null {
  if (previous === 0) return current === 0 ? 0 : null;
  return ((current - previous) / previous) * 100;
}

/** Partes da data no fuso de Brasília. */
function partsBRT(ms: number) {
  const d = new Date(ms + BRT_OFFSET_MS);
  return { y: d.getUTCFullYear(), m: d.getUTCMonth(), d: d.getUTCDate(), h: d.getUTCHours() };
}

const pad = (n: number) => String(n).padStart(2, "0");
const MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

export function bucketLabel(ms: number, granularity: "hour" | "day" | "month"): string {
  const p = partsBRT(ms);
  if (granularity === "hour") return `${pad(p.h)}h`;
  if (granularity === "day") return `${pad(p.d)}/${pad(p.m + 1)}`;
  return `${MONTHS[p.m]}/${String(p.y).slice(2)}`;
}

/** Gera os "baldes" vazios do período, para o gráfico não ter buracos. */
export function buildBuckets(
  period: DashboardPeriod,
  range: PeriodRange,
  firstBudgetMs: number | null
): { granularity: "hour" | "day" | "month"; keys: { key: string; label: string }[]; keyOf: (ms: number) => string } {
  if (period === "today" || period === "yesterday") {
    const start = range.start as number;
    const keys = Array.from({ length: 24 }, (_, i) => {
      const ms = start + i * 60 * 60 * 1000;
      return { key: String(i), label: bucketLabel(ms, "hour") };
    });
    return { granularity: "hour", keys, keyOf: (ms) => String(partsBRT(ms).h) };
  }

  if (period === "7d" || period === "30d") {
    const start = range.start as number;
    const days = period === "7d" ? 7 : 30;
    const keys = Array.from({ length: days }, (_, i) => {
      const ms = start + i * DAY_MS;
      return { key: String(startOfDayBRT(new Date(ms))), label: bucketLabel(ms, "day") };
    });
    return { granularity: "day", keys, keyOf: (ms) => String(startOfDayBRT(new Date(ms))) };
  }

  // Todo o período: meses desde o primeiro orçamento (máx. 24 meses)
  const first = partsBRT(firstBudgetMs ?? range.end);
  const last = partsBRT(range.end);
  let months = (last.y - first.y) * 12 + (last.m - first.m) + 1;
  months = Math.min(Math.max(months, 1), 24);

  const keys = Array.from({ length: months }, (_, i) => {
    const idx = last.y * 12 + last.m - (months - 1 - i);
    const y = Math.floor(idx / 12);
    const m = idx % 12;
    return { key: `${y}-${m}`, label: `${MONTHS[m]}/${String(y).slice(2)}` };
  });

  return {
    granularity: "month",
    keys,
    keyOf: (ms) => {
      const p = partsBRT(ms);
      return `${p.y}-${p.m}`;
    },
  };
}
