"use client";

import { getBudgetsCount } from "@/actions/budgets/budget.action";
import { getClientsCount } from "@/actions/clients/client.action";
import { CardStats } from "@/components/common/Cards";
import { useAuthContext } from "@/context/auth-context";
import { getCompleteDate, getGreeting } from "@/utils/functions/date";
import { formatCurrency, getFirstName } from "@/utils/functions/string";
import { CrownIcon, MoneyBag02Icon, ReceiptDollarIcon, UserCheck01Icon } from "@hugeicons/core-free-icons";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const { user } = useAuthContext();

    const nameUser = user?.user?.name || '';

    const [countClients, setCountClients] = useState(0);
    const [countBudgets, setCountBudgets] = useState(0);

    useEffect(() => {
        async function load() {
            // 1. Pega quantidade de clientes
            const totalClients = await getClientsCount();
            setCountClients(totalClients);

            // 2. Pega quantidade de orçamentos
            const totalBudgets = await getBudgetsCount();
            setCountBudgets(totalBudgets);
            
        }

        load();
    }, []);

    return (
        <div className="grid gap-4">
            <section className="col-span-12">
                <h1 className="text-stone-800 dark:text-white font-semibold text-xl">👋 {getGreeting()}, {getFirstName(nameUser)} !</h1>
                <span className="text-md block text-stone-500 dark:text-stone-300">{getCompleteDate()}</span>
            </section>
            <section className="col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <CardStats Icon={UserCheck01Icon} title='Clientes Ativos' data={String(countClients)} />
                <CardStats Icon={CrownIcon} title='Orçamentos Criados' data={String(countBudgets)} />
                <CardStats Icon={MoneyBag02Icon} title='Ticket Médio' data={formatCurrency(0)} />
                <CardStats Icon={ReceiptDollarIcon} title='Faturamento' data={formatCurrency(0)} />
            </section>
        </div>
    )
}