"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { createContext, ReactNode, useContext, useState } from "react";

type ModalOptions = {
    /** Impede fechar ao clicar fora (backdrop) ou pressionar ESC. */
    preventOutsideClose?: boolean,
}

type ModalData = {
    component: ReactNode,
    className?: string,
} & ModalOptions

type ModalContextType = {
    openModal: (component: ReactNode, className?: string, options?: ModalOptions) => void,
    closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [modals, setModals] = useState<ModalData[]>([]);

    const openModal = (component: ReactNode, className = 'sm:max-w-162.5', options?: ModalOptions) => {
        setModals(prev => [...prev, { component, className, ...options }]);
    }

    const closeModal = () => {
        setModals(prev => prev.slice(0, -1));
    }

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            {modals.map((modal, index) => (
                <Dialog key={index} open={true} onOpenChange={closeModal}>
                    <DialogContent
                        className={modal.className}
                        onInteractOutside={(e) => {
                            // popups portalizados (ex.: Combobox) não devem fechar a modal
                            const target = e.target as HTMLElement | null;
                            if (modal.preventOutsideClose || target?.closest?.('[data-slot="combobox-content"]')) {
                                e.preventDefault();
                            }
                        }}
                        onEscapeKeyDown={modal.preventOutsideClose ? (e) => e.preventDefault() : undefined}
                    >
                        {modal.component}
                    </DialogContent>
                </Dialog>
            ))}
        </ModalContext.Provider>
    )
}

export const useModalContext = () => {
    const context = useContext(ModalContext)
    if (!context) throw new Error('useModalContext deve ser usado dentro de ModalProvider')
        
    return context
}