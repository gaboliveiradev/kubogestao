export type DashboardPeriod = "today" | "yesterday" | "7d" | "30d" | "all";

export const DASHBOARD_PERIODS: { value: DashboardPeriod; label: string }[] = [
  { value: "today", label: "Hoje" },
  { value: "yesterday", label: "Ontem" },
  { value: "7d", label: "Últimos 7 dias" },
  { value: "30d", label: "Últimos 30 dias" },
  { value: "all", label: "Todo o período" },
];

export type KpiValue = {
  value: number;
  /** Variação percentual vs. período anterior (null quando não há base de comparação) */
  delta: number | null;
};

export type TimeSeriesPoint = { label: string; total: number; count: number };
export type RankPoint = { name: string; value: number; count?: number };

export type DashboardData = {
  period: DashboardPeriod;
  /** Descrição da comparação, ex.: "vs. 7 dias anteriores" */
  compareLabel: string | null;
  kpis: {
    budgets: KpiValue;
    revenue: KpiValue;
    avgTicket: KpiValue;
    newClients: KpiValue;
  };
  totalClients: number;
  series: TimeSeriesPoint[];
  seriesGranularity: "hour" | "day" | "month";
  topClients: RankPoint[];
  topItems: RankPoint[];
  byState: RankPoint[];
  hasData: boolean;
};
