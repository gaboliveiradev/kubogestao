"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUpDownIcon } from "@hugeicons/core-free-icons"
import ClientFormModal from "./clients-form-modal"
import DropdownAction from "@/components/table/DropdownAction"
import { ClientDTO } from "@/services/firebase/clients/dtos/clients.dto"
import { formatDocument, formatPhone } from "@/utils/functions/string"
import { deleteClient } from "@/actions/clients/delete-client.action"

export const ClientColumnsDesktop: ColumnDef<ClientDTO>[] = [
    {
        accessorKey: "corporate_name",
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
                    <p className="flex justify-start items-center gap-1">{row.original.corporate_name}</p>
                    {(row.original.document) && (
                        <span className="text-xs text-muted-foreground">
                            {formatDocument(row.original.document)}
                        </span>
                    )}
                </div>
            );
        }
    },
    {
        accessorKey: "city",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Endereço
                    <HugeiconsIcon icon={ArrowUpDownIcon} />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="px-4">
                    <p className="flex justify-start items-center gap-1">{row.original.address}, {row.original.number}</p>
                    <span className="text-xs text-muted-foreground">
                        {row.original.neighborhood}, {row.original.city} · {row.original.state}
                    </span>
                </div>
            );
        }
    },
    {
        accessorKey: "customer_email",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Contato
                    <HugeiconsIcon icon={ArrowUpDownIcon} />
                </Button>
            );
        },
        cell: ({ row }) => {
            const {
                customer_email,
                billing_email,
                responsible_name,
                responsible_phone,
            } = row.original;

            return (
                <div className="px-4 flex flex-col text-sm">
                    {(customer_email || billing_email) && (
                        <span>
                            {customer_email || billing_email}
                        </span>
                    )}

                    {responsible_name && (
                        <span className="text-xs text-muted-foreground">
                            {responsible_name}
                            {responsible_phone && ` · ${formatPhone(responsible_phone)}`}
                        </span>
                    )}
                </div>
            );
        }
    },
    {
        id: 'actions',
        enableHiding: true,
        cell: ({ row }) => {
            return <DropdownAction id={row.original.id || ''} formEdit={<ClientFormModal id={row.original.id} />} size="lg" onDelete={deleteClient} />;
        }
    }
]