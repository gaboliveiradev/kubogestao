"use client";

import { ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { RankPoint } from "@/types/dashboard";
import { formatCurrency } from "@/utils/functions/string";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

const config = { value: { label: "Valor", color: "var(--primary)" } } satisfies ChartConfig;

const truncate = (s: string, n = 18) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

type RankingChartProps = {
    data: RankPoint[];
    /** Texto da segunda linha do tooltip, ex.: "orçamentos" ou "unidades" */
    countLabel: string;
};

/** Barras horizontais com valor em R$ (top N). */
export default function RankingChart({ data, countLabel }: RankingChartProps) {
    return (
        <ChartContainer config={config} className="h-64 w-full">
            <BarChart data={data} layout="vertical" margin={{ left: 0, right: 72 }}>
                <XAxis type="number" hide />
                <YAxis
                    dataKey="name"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    width={110}
                    tickFormatter={(v: string) => truncate(v)}
                />
                <ChartTooltip
                    cursor={{ fill: "var(--muted)", opacity: 0.5 }}
                    content={({ active, payload }) => {
                        if (!active || !payload?.length) return null;
                        const p = payload[0].payload as RankPoint;
                        return (
                            <div className="rounded-lg border bg-background px-3 py-2 text-xs shadow-xl">
                                <div className="mb-1 font-medium">{p.name}</div>
                                <div className="font-semibold">{formatCurrency(p.value)}</div>
                                <div className="text-muted-foreground">
                                    {p.count} {countLabel}
                                </div>
                            </div>
                        );
                    }}
                />
                <Bar dataKey="value" fill="var(--color-value)" radius={6} barSize={22}>
                    <LabelList
                        dataKey="value"
                        position="right"
                        className="fill-muted-foreground"
                        fontSize={11}
                        formatter={(v: number) => formatCurrency(v)}
                    />
                </Bar>
            </BarChart>
        </ChartContainer>
    );
}
