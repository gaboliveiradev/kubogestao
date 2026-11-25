import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown01Icon, ArrowUp01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon, HugeiconsIconProps } from "@hugeicons/react";

type KpiCardProps = {
    Icon: HugeiconsIconProps["icon"];
    title: string;
    data: string;
    /** Variação % vs. período anterior; null = sem comparação */
    delta: number | null;
    compareLabel: string | null;
};

export default function KpiCard({ Icon, title, data, delta, compareLabel }: KpiCardProps) {
    const up = (delta ?? 0) >= 0;

    return (
        <Card className="py-0">
            <CardContent className="space-y-3 p-4!">
                <div className="flex items-center justify-between">
                    <h2 className="text-sm text-muted-foreground">{title}</h2>
                    <HugeiconsIcon icon={Icon} className="size-9 rounded-full bg-primary p-2 text-white" />
                </div>

                <p className="text-2xl font-bold tracking-tight">{data}</p>

                {compareLabel && (
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        {delta === null ? (
                            <span className="rounded-md bg-muted px-1.5 py-0.5 font-medium">novo</span>
                        ) : (
                            <span
                                className={`inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-medium ${up
                                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                    : "bg-red-500/10 text-red-600 dark:text-red-400"
                                    }`}
                            >
                                <HugeiconsIcon icon={up ? ArrowUp01Icon : ArrowDown01Icon} className="size-3.5" />
                                {Math.abs(delta).toFixed(1).replace(".", ",")}%
                            </span>
                        )}
                        {compareLabel}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
