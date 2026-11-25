"use client";

import { Invoice01Icon, UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useState } from "react";

type Props = {
    profile: React.ReactNode;
    budget: React.ReactNode;
};

const TABS = [
    { value: "profile", label: "Meu Perfil", icon: UserIcon },
    { value: "budget", label: "Orçamentos", icon: Invoice01Icon },
] as const;

type TabValue = (typeof TABS)[number]["value"];

export default function SettingsTabs({ profile, budget }: Props) {
    const [tab, setTab] = useState<TabValue>("profile");

    // permite abrir direto em /app/settings#budget
    useEffect(() => {
        if (window.location.hash === "#budget") setTab("budget");
    }, []);

    return (
        <div className="flex flex-col gap-6 md:flex-row md:gap-8">
            <nav
                role="tablist"
                aria-orientation="vertical"
                className="flex shrink-0 gap-1 md:sticky md:top-4 md:h-fit md:w-52 md:flex-col"
            >
                {TABS.map(({ value, label, icon }) => (
                    <button
                        key={value}
                        type="button"
                        role="tab"
                        aria-selected={tab === value}
                        onClick={() => setTab(value)}
                        className={`flex h-10 flex-1 cursor-pointer items-center gap-2.5 rounded-lg px-3 text-sm font-medium transition-colors md:flex-none ${tab === value
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                    >
                        <HugeiconsIcon icon={icon} className="size-4.5" />
                        {label}
                    </button>
                ))}
            </nav>

            <div role="tabpanel" className="min-w-0 flex-1">
                {tab === "profile" ? profile : budget}
            </div>
        </div>
    );
}
