"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { createContext, ReactNode, useContext, useState } from "react";

type ModalData = {
    component: ReactNode,
    className?: string,
}

type ModalContextType = {
    openModal: (component: ReactNode, className?: string) => void,
    closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [modals, setModals] = useState<ModalData[]>([]);

    const openModal = (component: ReactNode, className = 'sm:max-w-162.5') => {
        setModals(prev => [...prev, { component, className }]);
    }

    const closeModal = () => {
        setModals(prev => prev.slice(0, -1));
    }

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            {modals.map((modal, index) => (
                <Dialog key={index} open={true} onOpenChange={closeModal}>
                    <DialogContent className={modal.className}>
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