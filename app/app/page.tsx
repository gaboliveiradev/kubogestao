export const dynamic = "force-dynamic";

import { getDashboardData } from "@/actions/dashboard/get-dashboard-data.action";
import { auth } from "@/lib/auth";
import { DASHBOARD_PERIODS, DashboardPeriod } from "@/types/dashboard";
import { getCompleteDate, getGreeting } from "@/utils/functions/date";
import { formatCurrency, getFirstName } from "@/utils/functions/string";
import {
  CrownIcon,
  MoneyBag02Icon,
  ReceiptDollarIcon,
  UserAdd01Icon,
} from "@hugeicons/core-free-icons";
import ChartCard from "./components/dashboard/ChartCard";
import EvolutionChart from "./components/dashboard/EvolutionChart";
import KpiCard from "./components/dashboard/KpiCard";
import PeriodFilter from "./components/dashboard/PeriodFilter";
import RankingChart from "./components/dashboard/RankingChart";
import StateDonut from "./components/dashboard/StateDonut";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ periodo?: string }>;
}) {
  const { periodo } = await searchParams;
  const period: DashboardPeriod = DASHBOARD_PERIODS.some((p) => p.value === periodo)
    ? (periodo as DashboardPeriod)
    : "30d";

  const [user, data] = await Promise.all([auth(), getDashboardData(period)]);

  const nameUser = user?.user?.name || "";
  const { kpis, compareLabel } = data;

  const evolutionDescription =
    data.seriesGranularity === "hour" ? "Valor orçado por hora"
      : data.seriesGranularity === "day" ? "Valor orçado por dia"
        : "Valor orçado por mês";

  return (
    <div className="grid gap-4">
      <section className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-stone-800 dark:text-white font-semibold text-xl">
            👋 {getGreeting()}, {getFirstName(nameUser)}!
          </h1>
          <span className="text-md block text-stone-500 dark:text-stone-300">
            {getCompleteDate()}
          </span>
        </div>
        <PeriodFilter value={period} />
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard Icon={CrownIcon} title="Orçamentos Criados" data={String(kpis.budgets.value)} delta={kpis.budgets.delta} compareLabel={compareLabel} />
        <KpiCard Icon={ReceiptDollarIcon} title="Valor Orçado" data={formatCurrency(kpis.revenue.value)} delta={kpis.revenue.delta} compareLabel={compareLabel} />
        <KpiCard Icon={MoneyBag02Icon} title="Ticket Médio" data={formatCurrency(kpis.avgTicket.value)} delta={kpis.avgTicket.delta} compareLabel={compareLabel} />
        <KpiCard Icon={UserAdd01Icon} title="Novos Clientes" data={String(kpis.newClients.value)} delta={kpis.newClients.delta} compareLabel={compareLabel} />
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ChartCard title="Evolução" description={evolutionDescription} empty={!data.hasData} className="lg:col-span-2">
          <EvolutionChart data={data.series} />
        </ChartCard>

        <ChartCard title="Orçamentos por estado" description="Onde estão seus clientes" empty={!data.hasData}>
          <StateDonut data={data.byState} />
        </ChartCard>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="Maiores clientes" description="Por valor orçado" empty={!data.hasData}>
          <RankingChart data={data.topClients} countLabel="orçamento(s)" />
        </ChartCard>

        <ChartCard title="Itens mais orçados" description="Por valor total" empty={data.topItems.length === 0}>
          <RankingChart data={data.topItems} countLabel="unidade(s)" />
        </ChartCard>
      </section>
    </div>
  );
}
