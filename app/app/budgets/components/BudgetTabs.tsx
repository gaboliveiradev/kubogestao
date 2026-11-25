/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ResumeBudgetValue from "./ResumeBudgetValue"
import ClientTab from "./tabs/ClientTab"
import ItemsTab from "./tabs/ItemsTab"
import ObservationTab from "./tabs/ObservationTab"
import { Tabs } from "@/components/ui/tabs";
import { ModalTabsList, ModalTabsTrigger } from "@/components/form/ModalTabs";
import { InputLongTextIcon, Task01Icon, UserAccountIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { BudgetItem, BudgetItemForm } from "@/hooks/use-budget-item";

type TabValue = "clients" | "items" | "observations";

type BudgetTabsProps = {
    values: any
    errors: any,
    handleChange: (e: any) => void,
    handleAddItem: (itemForm: BudgetItemForm) => boolean,
    handleUpdateItem: (id: string, itemForm: BudgetItemForm) => boolean,
    items: BudgetItem[],
    handleRemoveItem: (id: string) => void,
    toggleItem: (id: string) => void,
    expandedItemId: string | null,
    total: number | undefined,
    hasDefaultObservation?: boolean,
    onApplyDefaultObservation?: () => void,
    onObservationsOpen?: () => void,
}

export default function BudgetTabs({
    values,
    errors,
    handleChange,
    handleAddItem,
    handleUpdateItem,
    items,
    handleRemoveItem,
    toggleItem,
    expandedItemId,
    total,
    hasDefaultObservation,
    onApplyDefaultObservation,
    onObservationsOpen,
}: BudgetTabsProps) {
    const [activeTab, setActiveTab] = useState<TabValue>("clients");

    function handleTabChange(value: string) {
        if (value === "clients" || value === "items" || value === "observations") {
            setActiveTab(value)
            if (value === "observations") onObservationsOpen?.()
        }
    }

    return (
        <div className="lg:col-span-12 col-span-12 w-full py-2">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full mb-4">
                <div className="w-full">
                    <ModalTabsList>
                        <ModalTabsTrigger value="clients">
                            <HugeiconsIcon icon={UserAccountIcon} />
                            Dados do Cliente
                        </ModalTabsTrigger>
                        <ModalTabsTrigger value="items">
                            <HugeiconsIcon icon={InputLongTextIcon} />
                            Items do Orçamento
                        </ModalTabsTrigger>
                        <ModalTabsTrigger value="observations">
                            <HugeiconsIcon icon={Task01Icon} />
                            Observações
                        </ModalTabsTrigger>
                    </ModalTabsList>
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
                    handleUpdateItem={handleUpdateItem}
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
                    hasDefaultObservation={hasDefaultObservation}
                    onApplyDefaultObservation={onApplyDefaultObservation}
                />

                <div className="grid grid-cols-12 gap-4 mt-4">
                    <ResumeBudgetValue total={total} />
                </div>
            </div>
        </div>
    )
}