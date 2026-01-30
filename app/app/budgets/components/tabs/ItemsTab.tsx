import BudgetItemsTable from "../BudgetItemsTable"
import { BudgetItem, BudgetItemForm } from "@/hooks/use-budget-item"
import { Dispatch, SetStateAction } from "react"

type ItemTabProps = {
    itemForm: BudgetItemForm,
    setItemForm: Dispatch<SetStateAction<BudgetItemForm>>;
    handleAddItem: () => void,
    handleItemChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    items: BudgetItem[],
    handleRemoveItem: (id: string) => void,
    toggleItem: (id: string) => void,
    expandedItemId: string | null,
}

export default function ItemsTab({
    itemForm,
    setItemForm,
    handleAddItem,
    handleItemChange,
    items,
    handleRemoveItem,
    toggleItem,
    expandedItemId,
}: ItemTabProps) {
    return (
        <BudgetItemsTable
            items={items}
            handleRemoveItem={handleRemoveItem}
            toggleItem={toggleItem}
            expandedItemId={expandedItemId}
            itemForm={itemForm}
            setItemForm={setItemForm}
            handleAddItem={handleAddItem}
            handleItemChange={handleItemChange}
        />
    )
}