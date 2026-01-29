import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency } from "@/utils/functions/string"
import { ArrowDown02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
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
        <>
            <div className="grid grid-cols-12 gap-4 mb-4">
                <div className="col-span-12 lg:col-span-7">
                    <Label>Nome</Label>
                    <Input
                        name="name"
                        value={itemForm.name}
                        onChange={handleItemChange}
                    />
                </div>

                <div className="col-span-6 lg:col-span-1">
                    <Label>Qtd</Label>
                    <Input
                        name="quantity"
                        type="number"
                        min={1}
                        value={itemForm.quantity}
                        onChange={handleItemChange}
                    />
                </div>

                <div className="col-span-6 lg:col-span-2">
                    <Label>Valor Unitário (R$)</Label>
                    <Input
                        name="value"
                        inputMode="numeric"
                        value={itemForm.value}
                        onChange={(e) => {
                            const rawValue = e.target.value
                            setItemForm(prev => ({
                                ...prev,
                                value: formatCurrency(rawValue),
                            }))
                        }}
                    />

                </div>

                <div className="col-span-12 lg:col-span-2 flex items-end">
                    <Button
                        type="button"
                        className="w-full cursor-pointer"
                        onClick={handleAddItem}
                    >
                        <HugeiconsIcon icon={ArrowDown02Icon} />
                    </Button>
                </div>

                <div className="col-span-12">
                    <Textarea
                        name="description"
                        placeholder="Descrição do item (opcional)"
                        value={itemForm.description}
                        onChange={handleItemChange}
                    />
                </div>
            </div>

            <BudgetItemsTable
                items={items}
                handleRemoveItem={handleRemoveItem}
                toggleItem={toggleItem}
                expandedItemId={expandedItemId}
            />
        </>
    )
}