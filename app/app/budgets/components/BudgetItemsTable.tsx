"use client";

import React, { Dispatch, SetStateAction } from "react"
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table"
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import { formatCurrency } from "@/utils/functions/string"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, ArrowRight01Icon, Delete02Icon, FolderRemoveIcon } from "@hugeicons/core-free-icons"
import { BudgetItem, BudgetItemForm } from "@/hooks/use-budget-item"
import { useModalContext } from "@/context/modal-context"
import AddItemFormModal from "./AddItemFormModal";

export type BudgetItemsTableProps = {
    items: BudgetItem[],
    handleRemoveItem: (id: string) => void,
    toggleItem: (id: string) => void,
    expandedItemId: string | null,
    itemForm: BudgetItemForm,
    setItemForm: Dispatch<SetStateAction<BudgetItemForm>>;
    handleAddItem: () => void,
    handleItemChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
}

export default function BudgetItemsTable({ items, handleRemoveItem, toggleItem, expandedItemId, itemForm, setItemForm, handleItemChange, handleAddItem }: BudgetItemsTableProps) {
    const { openModal } = useModalContext();

    function handleClickOpenModalAddItem() {
        openModal(
            <AddItemFormModal
                itemForm={itemForm} 
                setItemForm={setItemForm}
                handleItemChange={handleItemChange}
                handleAddItem={handleAddItem}
            />
        );
    }

    return (
        <Table className="border">
            <TableHeader className="sticky top-0 bg-background z-10">
                <TableRow>
                    <TableHead className="text-start px-2 w-3">
                        <Button type="button" onClick={handleClickOpenModalAddItem} className="cursor-pointer" variant="default" size="icon-sm">
                            <HugeiconsIcon icon={Add01Icon} />
                        </Button>
                    </TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead className="text-end w-3">Qtd</TableHead>
                    <TableHead className="text-end">Valor Unit (R$)</TableHead>
                    <TableHead className="text-end">Total (R$)</TableHead>
                    <TableHead className="text-end w-3"></TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {items.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={5}>
                            <div>
                                <Empty>
                                    <EmptyHeader>
                                        <EmptyMedia variant="icon">
                                            <HugeiconsIcon icon={FolderRemoveIcon} />
                                        </EmptyMedia>
                                        <EmptyTitle>Nenhum Item Vinculado</EmptyTitle>
                                        <EmptyDescription>
                                            No momento não há itens para serem exibidos.
                                        </EmptyDescription>
                                    </EmptyHeader>
                                </Empty>
                            </div>
                        </TableCell>
                    </TableRow>
                )}

                {items.map((item) => {
                    const isExpanded = expandedItemId === item.id

                    return (
                        <React.Fragment key={item.id}>
                            <tr
                                className="border-t cursor-pointer hover:bg-muted/50"
                                onClick={() => toggleItem(item.id)}
                            >
                                <td className="p-2 text-start">
                                    <HugeiconsIcon icon={ArrowRight01Icon} className={`transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                                </td>
                                <td className="p-2">{item.name}</td>
                                <td className="p-2 text-center">{item.quantity}</td>
                                <td className="p-2 text-right">
                                    {formatCurrency(item.value)}
                                </td>
                                <td className="p-2 text-right font-medium">
                                    {formatCurrency(item.quantity * item.value)}
                                </td>
                                <td
                                    className="p-2 text-right"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="cursor-pointer"
                                        onClick={() => handleRemoveItem(item.id)}
                                    >
                                        <HugeiconsIcon icon={Delete02Icon} />
                                    </Button>
                                </td>
                            </tr>

                            {isExpanded && (
                                <tr className="bg-muted/30">
                                    <td colSpan={5} className="p-4 text-sm text-muted-foreground">
                                        {item.description || "Nenhuma descrição informada."}
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    )
                })}
            </TableBody>
        </Table>
    )
}