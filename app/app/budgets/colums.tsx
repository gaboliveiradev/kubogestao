"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUpDownIcon, Pdf02Icon } from "@hugeicons/core-free-icons"
import DropdownAction from "@/components/table/DropdownAction"
import { BudgetDTO } from "@/services/firebase/budgets/dtos/budgets.dto"
import BudgetsFormModal from "./budgets-form-modal"
import { formatCurrency, formatDocument } from "@/utils/functions/string"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { generateBudgetPdfLink } from "@/actions/reports/generate-budge-pdf-link.action"
import { deleteBudget } from "@/actions/budgets/delete-budget.action"

export const BudgetsColumnsDesktop: ColumnDef<BudgetDTO>[] = [
    {
        accessorKey: "client_name",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Cliente
                    <HugeiconsIcon icon={ArrowUpDownIcon} />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="px-4">
                    <p className="flex justify-start items-center gap-1">{row.original.client_name}</p>
                    {(row.original.client_document) && (
                        <span className="text-xs text-muted-foreground">
                            {formatDocument(row.original.client_document)} - {row.original.budget_email}
                        </span>
                    )}
                </div>
            );
        }
    },
    {
        accessorKey: "budget_key",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Código Orçamento
                    <HugeiconsIcon icon={ArrowUpDownIcon} />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="px-4">
                    <p className="flex justify-start items-center gap-1">{row.original.budget_key}</p>
                </div>
            );
        }
    },
    {
        accessorKey: "city",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Total do Orçamento
                    <HugeiconsIcon icon={ArrowUpDownIcon} />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="px-4">
                    <p className="flex justify-start items-center gap-1">{formatCurrency(row.original.total)}</p>
                </div>
            );
        }
    },
    {
        id: 'actions',
        enableHiding: true,
        cell: ({ row }) => {
            return <DropdownAction id={row.original.id || ''} formEdit={<BudgetsFormModal id={row.original.id} />} size="lg" onDelete={deleteBudget} menuItems={[
                <DropdownMenuItem key={row.original.id} onClick={async () => {
                    const url = await generateBudgetPdfLink(row.original.id);
                    window.open(url, "_blank");
                }}>
                    <HugeiconsIcon icon={Pdf02Icon} />
                    <span>Gerar PDF</span>
                </DropdownMenuItem>
            ]} />;
        }
    }
]