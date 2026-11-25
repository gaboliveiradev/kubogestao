import BudgetItemsTable from "../BudgetItemsTable"
import { BudgetItem, BudgetItemForm } from "@/hooks/use-budget-item"

type ItemTabProps = {
    handleAddItem: (itemForm: BudgetItemForm) => boolean,
    handleUpdateItem: (id: string, itemForm: BudgetItemForm) => boolean,
    items: BudgetItem[],
    handleRemoveItem: (id: string) => void,
    toggleItem: (id: string) => void,
    expandedItemId: string | null,
}

export default function ItemsTab({
    handleAddItem,
    handleUpdateItem,
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
            handleAddItem={handleAddItem}
            handleUpdateItem={handleUpdateItem}
        />
    )
}