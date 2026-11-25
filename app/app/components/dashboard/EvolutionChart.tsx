"use client";

import { ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { TimeSeriesPoint } from "@/types/dashboard";
import { formatCurrency } from "@/utils/functions/string";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const config = {
    total: { label: "Valor orçado", color: "var(--primary)" },
} satisfies ChartConfig;

const compact = (v: number) =>
    v >= 1_000_000 ? `${(v / 1_000_000).toFixed(1)}M` : v >= 1000 ? `${Math.round(v / 1000)}k` : String(v);

export default function EvolutionChart({ data }: { data: TimeSeriesPoint[] }) {
    return (
        <ChartContainer config={config} className="h-72 w-full">
            <AreaChart data={data} margin={{ left: 4, right: 8, top: 8 }}>
                <defs>
                    <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-total)" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="var(--color-total)" stopOpacity={0.02} />
                    </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} minTickGap={24} />
                <YAxis tickLine={false} axisLine={false} width={40} tickFormatter={compact} />
                <ChartTooltip
                    cursor={false}
                    content={({ active, payload }) => {
                        if (!active || !payload?.length) return null;
                        const p = payload[0].payload as TimeSeriesPoint;
                        return (
                            <div className="rounded-lg border bg-background px-3 py-2 text-xs shadow-xl">
                                <div className="mb-1 font-medium">{p.label}</div>
                                <div className="font-semibold">{formatCurrency(p.total)}</div>
                                <div className="text-muted-foreground">
                                    {p.count} {p.count === 1 ? "orçamento" : "orçamentos"}
                                </div>
                            </div>
                        );
                    }}
                />
                <Area
                    dataKey="total"
                    type="monotone"
                    stroke="var(--color-total)"
                    strokeWidth={2}
                    fill="url(#fillTotal)"
                />
            </AreaChart>
        </ChartContainer>
    );
}
