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

  function handleAddItem(itemForm: BudgetItemForm) {
    if (!itemForm.name) {
      showErrorSonner('Campo nome item é obrigatório.');
      return;
    }

    const parsedValue = parseCurrency(itemForm.value) ?? 0;

    const newItem: BudgetItem = {
      id: crypto.randomUUID(),
      name: itemForm.name,
      quantity: Number(itemForm.quantity),
      value: parsedValue,
      description: itemForm.description,
    };

    setItems(prev => [...prev, newItem]);
  }

  function handleRemoveItem(id: string) {
    setItems(prev => prev.filter(item => item.id !== id));
  }

  function toggleItem(id: string) {
    setExpandedItemId(prev => (prev === id ? null : id));
  }

  const total = items.reduce(
    (acc, item) => acc + item.quantity * item.value,
    0
  );

  return {
    items,
    setItems,
    handleAddItem,
    handleRemoveItem,
    toggleItem,
    expandedItemId,
    total,
  };
}