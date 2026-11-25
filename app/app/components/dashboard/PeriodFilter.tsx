"use client";

import { DASHBOARD_PERIODS, DashboardPeriod } from "@/types/dashboard";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

export default function PeriodFilter({ value }: { value: DashboardPeriod }) {
    const router = useRouter();
    const pathname = usePathname();
    const [pending, startTransition] = useTransition();

    function handleChange(next: DashboardPeriod) {
        if (next === value) return;
        startTransition(() => router.push(`${pathname}?periodo=${next}`, { scroll: false }));
    }

    return (
        <div
            role="tablist"
            aria-label="Filtrar por período"
            className={`flex w-full gap-1 overflow-x-auto rounded-xl bg-muted p-1 sm:w-auto ${pending ? "opacity-70" : ""}`}
        >
            {DASHBOARD_PERIODS.map((p) => (
                <button
                    key={p.value}
                    type="button"
                    role="tab"
                    aria-selected={value === p.value}
                    onClick={() => handleChange(p.value)}
                    className={`h-9 shrink-0 cursor-pointer whitespace-nowrap rounded-lg px-3 text-sm font-medium transition-colors ${value === p.value
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    {p.label}
                </button>
            ))}
        </div>
    );
}
