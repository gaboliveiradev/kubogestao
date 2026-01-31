/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ResumeBudgetValue from "./ResumeBudgetValue"
import ClientTab from "./tabs/ClientTab"
import ItemsTab from "./tabs/ItemsTab"
import ObservationTab from "./tabs/ObservationTab"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InputLongTextIcon, Task01Icon, UserAccountIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { BudgetItem, BudgetItemForm } from "@/hooks/use-budget-item";

type TabValue = "clients" | "items" | "observations";

type BudgetTabsProps = {
    values: any
    errors: any,
    handleChange: (e: any) => void,
    handleAddItem: (itemForm: BudgetItemForm) => void,
    items: BudgetItem[],
    handleRemoveItem: (id: string) => void,
    toggleItem: (id: string) => void,
    expandedItemId: string | null,
    total: number | undefined,
}

export default function BudgetTabs({
    values,
    errors,
    handleChange,
    handleAddItem,
    items,
    handleRemoveItem,
    toggleItem,
    expandedItemId,
    total,
}: BudgetTabsProps) {
    const [activeTab, setActiveTab] = useState<TabValue>("clients");

    function handleTabChange(value: string) {
        if (value === "clients" || value === "items" || value === "observations") {
            setActiveTab(value)
        }
    }

    return (
        <div className="lg:col-span-12 col-span-12 w-full py-2">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full mb-6">
                <div className="w-full border">
                    <TabsList className="inline-flex px-0 bg-transparent">
                        <TabsTrigger value="clients">
                            <HugeiconsIcon icon={UserAccountIcon} />
                            Dados do Cliente
                        </TabsTrigger>
                        <TabsTrigger value="items">
                            <HugeiconsIcon icon={InputLongTextIcon} />
                            Items do Orçamento
                        </TabsTrigger>
                        <TabsTrigger value="observations">
                            <HugeiconsIcon icon={Task01Icon} />
                            Observações
                        </TabsTrigger>
                    </TabsList>
                </div>
            </Tabs>

            <div className={activeTab !== "clients" ? "hidden" : ""}>
                <ClientTab
                    values={values}
                    errors={errors}
                    handleChange={handleChange}
                />
            </div>

            <div className={activeTab !== "items" ? "hidden" : ""}>
                <ItemsTab
                    handleAddItem={handleAddItem}
                    items={items}
                    handleRemoveItem={handleRemoveItem}
                    toggleItem={toggleItem}
                    expandedItemId={expandedItemId}
                />

                <div className="grid grid-cols-12 gap-4 mt-4">
                    <ResumeBudgetValue total={total} />
                </div>
            </div>

            <div className={activeTab !== "observations" ? "hidden" : ""}>
                <ObservationTab
                    values={values}
                    handleChange={handleChange}
                />

                <div className="grid grid-cols-12 gap-4 mt-4">
                    <ResumeBudgetValue total={total} />
                </div>
            </div>
        </div>
    )
}