"use client";

import { CardStats } from "@/components/common/Cards";
import { useAuthContext } from "@/context/auth-context";
import { getCompleteDate, getGreeting } from "@/utils/functions/date";
import { getFirstName } from "@/utils/functions/string";
import { CrownIcon, MoneyBag02Icon, ReceiptDollarIcon, UserCheck01Icon } from "@hugeicons/core-free-icons";

export default function DashboardPage() {
    const { user } = useAuthContext();

    const nameUser = user?.user?.name || '';

    return (
        <div className="grid gap-4">
            <section className="col-span-12">
                <h1 className="text-stone-800 dark:text-white font-semibold text-xl">👋 {getGreeting()}, {getFirstName(nameUser)} !</h1>
                <span className="text-md block text-stone-500 dark:text-stone-300">{getCompleteDate()}</span>
            </section>
            <section className="col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <CardStats Icon={UserCheck01Icon} title='Clientes Ativos' data='17' />
                <CardStats Icon={CrownIcon} title='Orçamentos' data='9' />
                <CardStats Icon={MoneyBag02Icon} title='Ticket Médio' data='R$ 12.480,00' />
                <CardStats Icon={ReceiptDollarIcon} title='Faturamento' data='R$ 83.190,00' />
            </section>
        </div>
    )
}