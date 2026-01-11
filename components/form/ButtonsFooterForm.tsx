"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useModalContext } from "@/context/modal-context";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { CancelSquareIcon, CheckmarkSquare02Icon } from "@hugeicons/core-free-icons";

type Props = { cancelButton?: boolean, separator?: boolean, className?: string }

export default function ButtonsFooterForm({ cancelButton = true, separator = true, className }: Props) {
    const { closeModal } = useModalContext();

    return (
        <>
            {separator && (<Separator className="lg:col-span-12 col-span-12 my-2" />)}
            <div className={cn("lg:col-span-12 col-span-12 flex justify-end items-center gap-2", className)}>
                {cancelButton && (
                    <Button variant='outline' type='button' onClick={() => closeModal()}>
                        <HugeiconsIcon icon={CancelSquareIcon} />
                        Cancelar
                    </Button>
                )}
                <Button type="submit">
                    <HugeiconsIcon icon={CheckmarkSquare02Icon} />
                    Salvar
                </Button>
            </div>
        </>
    );
}