import React from "react"
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
import { FolderRemoveIcon } from "@hugeicons/core-free-icons"
import { BudgetItem } from "@/hooks/use-budget-item"

export type BudgetItemsTableProps = {
    items: BudgetItem[],
    handleRemoveItem: (id: string) => void,
    toggleItem: (id: string) => void,
    expandedItemId: string | null,
}

export default function BudgetItemsTable({ items, handleRemoveItem, toggleItem, expandedItemId }: BudgetItemsTableProps) {
    return (
        <Table className="border">
            <TableHeader className="sticky top-0 bg-background z-10">
                <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead className="text-right">Qtd</TableHead>
                    <TableHead className="text-right">Valor Unit (R$)</TableHead>
                    <TableHead className="text-right">Total (R$)</TableHead>
                    <TableHead />
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
                                <td className="p-2">{item.name}</td>
                                <td className="p-2 text-right">{item.quantity}</td>
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
                                        onClick={() => handleRemoveItem(item.id)}
                                    >
                                        Remover
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