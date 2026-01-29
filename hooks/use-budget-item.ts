import { parseCurrency } from "@/utils/functions/string"
import { showErrorSonner } from "@/utils/sonner"
import { useState } from "react"

export type BudgetItem = {
    id: string
    name: string
    quantity: number
    value: number
    description?: string
}

export type BudgetItemForm = {
    name: string,
    quantity: number,
    value: string,
    description: string,
}

export function useBudgetItems() {
    const [items, setItems] = useState<BudgetItem[]>([]);
    const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
    const [itemForm, setItemForm] = useState<BudgetItemForm>({
        name: "",
        quantity: 1,
        value: "",
        description: "",
    });

    function toggleItem(id: string) {
        setExpandedItemId(prev => (prev === id ? null : id))
    }

    function handleAddItem() {
        if (!itemForm.name) {
            showErrorSonner('Campo nome item é obrigatório.');
            return;
        } else if (!itemForm.quantity) {
            showErrorSonner('Campo quantidade é obrigatório.');
            return;
        } else if (!itemForm.value) {
            showErrorSonner('Campo valor unitário é obrigatório.');
            return;
        }

        const parsedValue = parseCurrency(itemForm.value) ?? 0

        const newItem: BudgetItem = {
            id: crypto.randomUUID(),
            name: itemForm.name,
            quantity: Number(itemForm.quantity),
            value: parsedValue,
            description: itemForm.description,
        }

        setItems(prev => [...prev, newItem])

        setItemForm({
            name: "",
            quantity: 1,
            value: "",
            description: "",
        });
    }

    function handleRemoveItem(id: string) {
        setItems(prev => prev.filter(item => item.id !== id))
    }

    function handleItemChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target
        setItemForm(prev => ({ ...prev, [name]: value }))
    }

    const total = items.reduce((acc, item) => {
        return acc + item.quantity * item.value
    }, 0)

    return {
        items,
        setItems,
        itemForm,
        setItemForm,
        handleAddItem,
        handleRemoveItem,
        toggleItem,
        handleItemChange,
        expandedItemId,
        total,
    }
}
