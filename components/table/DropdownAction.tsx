import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useModalContext } from "@/context/modal-context"
import React, { ReactNode } from "react"
import { Separator } from "../ui/separator"
import { HugeiconsIcon } from "@hugeicons/react"
import { MoreVerticalIcon, PencilEdit02Icon, Trash } from "@hugeicons/core-free-icons"
import { showErrorSonner, showSuccessSonner } from "@/utils/sonner"

type Props = {
    id: string,
    formEdit?: React.ReactNode,
    menuItems?: ReactNode[] | [],
    size?: 'sm' | 'md' | 'lg',
    onDelete?: (id: string) => Promise<{
        success: boolean
        message: string
    }>
}

export default function DropdownAction({ id, formEdit, menuItems = [], size = 'sm', onDelete }: Props) {
    const { openModal } = useModalContext();

    const handleDelete = async (id: string) => {
        if (!onDelete) return;

        const result = await onDelete(id);

        if (!result.success) {
            showErrorSonner(result.message);
            return;
        }

        showSuccessSonner(result.message);
    }

    return (
        <div className="text-right">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className="w-6 h-6">
                        <span className="sr-only">Abrir Menu de Ações</span>
                        <HugeiconsIcon icon={MoreVerticalIcon} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => openModal(formEdit, (size == 'sm') ? 'sm:max-w-[650px]' : (size == 'md') ? 'sm:max-w-[850px]' : 'sm:max-w-[950px]')}>
                        <HugeiconsIcon icon={PencilEdit02Icon} />
                        <span>Editar</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(id)}>
                        <HugeiconsIcon icon={Trash} />
                        <span>Deletar</span>
                    </DropdownMenuItem>
                    {menuItems && (<Separator />)}
                    {menuItems && menuItems.map((item, index) => (
                        <React.Fragment key={index}>{item}</React.Fragment>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}