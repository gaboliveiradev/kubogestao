"use client";

import { ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { RankPoint } from "@/types/dashboard";
import { Cell, Pie, PieChart } from "recharts";

const COLORS = [
    "oklch(0.606 0.25 292.717)",
    "oklch(0.72 0.17 200)",
    "oklch(0.75 0.17 150)",
    "oklch(0.78 0.16 75)",
    "oklch(0.7 0.19 20)",
    "oklch(0.7 0.02 260)",
];

export default function StateDonut({ data }: { data: RankPoint[] }) {
    const total = data.reduce((acc, d) => acc + d.value, 0);
    const config = Object.fromEntries(
        data.map((d, i) => [d.name, { label: d.name, color: COLORS[i % COLORS.length] }])
    ) as ChartConfig;

    return (
        <div className="flex flex-col items-center gap-4 sm:flex-row">
            <ChartContainer config={config} className="h-56 w-56 shrink-0">
                <PieChart>
                    <ChartTooltip
                        content={({ active, payload }) => {
                            if (!active || !payload?.length) return null;
                            const p = payload[0].payload as RankPoint;
                            return (
                                <div className="rounded-lg border bg-background px-3 py-2 text-xs shadow-xl">
                                    <span className="font-medium">{p.name}</span>: {p.value}{" "}
                                    {p.value === 1 ? "orçamento" : "orçamentos"} ({Math.round((p.value / total) * 100)}%)
                                </div>
                            );
                        }}
                    />
                    <Pie data={data} dataKey="value" nameKey="name" innerRadius={62} outerRadius={92} paddingAngle={2} strokeWidth={0}>
                        {data.map((d, i) => (
                            <Cell key={d.name} fill={COLORS[i % COLORS.length]} />
                        ))}
                    </Pie>
                    <text x="50%" y="48%" textAnchor="middle" className="fill-foreground text-2xl font-bold">
                        {total}
                    </text>
                    <text x="50%" y="58%" textAnchor="middle" className="fill-muted-foreground text-xs">
                        orçamentos
                    </text>
                </PieChart>
            </ChartContainer>

            <ul className="w-full space-y-2 text-sm">
                {data.map((d, i) => (
                    <li key={d.name} className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-2">
                            <span className="size-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                            {d.name}
                        </span>
                        <span className="text-muted-foreground">
                            {d.value} · {Math.round((d.value / total) * 100)}%
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
