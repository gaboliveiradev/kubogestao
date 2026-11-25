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

  function validateItemForm(itemForm: BudgetItemForm) {
    if (!itemForm.name.trim()) {
      showErrorSonner('Campo nome item é obrigatório.');
      return false;
    }

    if (!Number(itemForm.quantity) || Number(itemForm.quantity) < 1) {
      showErrorSonner('A quantidade deve ser no mínimo 1.');
      return false;
    }

    return true;
  }

  /** Retorna true quando o item foi adicionado. */
  function handleAddItem(itemForm: BudgetItemForm): boolean {
    if (!validateItemForm(itemForm)) return false;

    const newItem: BudgetItem = {
      id: crypto.randomUUID(),
      name: itemForm.name.trim(),
      quantity: Number(itemForm.quantity),
      value: parseCurrency(itemForm.value) ?? 0,
      description: itemForm.description,
    };

    setItems(prev => [...prev, newItem]);
    return true;
  }

  /** Retorna true quando o item foi atualizado. */
  function handleUpdateItem(id: string, itemForm: BudgetItemForm): boolean {
    if (!validateItemForm(itemForm)) return false;

    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              name: itemForm.name.trim(),
              quantity: Number(itemForm.quantity),
              value: parseCurrency(itemForm.value) ?? 0,
              description: itemForm.description,
            }
          : item
      )
    );
    return true;
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
    handleUpdateItem,
    handleRemoveItem,
    toggleItem,
    expandedItemId,
    total,
  };
}