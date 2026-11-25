"use client";

import { useModalContext } from "@/context/modal-context";
import { HugeiconsIcon } from "@hugeicons/react";
import { CancelSquareIcon, CheckmarkSquare02Icon } from "@hugeicons/core-free-icons";
import { ModalFooter, ModalFooterButton } from "./ModalFooter";

type Props = {
    cancelButton?: boolean,
    className?: string,
}

export default function ButtonsFooterForm({ cancelButton = true, className }: Props) {
    const { closeModal } = useModalContext();

    return (
        <ModalFooter className={className}>
            {cancelButton && (
                <ModalFooterButton variant="outline" type="button" onClick={() => closeModal()}>
                    <HugeiconsIcon icon={CancelSquareIcon} />
                    Cancelar
                </ModalFooterButton>
            )}
            <ModalFooterButton type="submit">
                <HugeiconsIcon icon={CheckmarkSquare02Icon} />
                Salvar
            </ModalFooterButton>
        </ModalFooter>
    );
}
