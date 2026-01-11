"use client";

import { Button } from "@/components/ui/button";
import { useModalContext } from "@/context/modal-context";
import { PlusSignSquareIcon, RotateSquareIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export type ClientsPageProps = {
    title: string,
    description?: string,
    pathList?: string,
    formComponent?: React.ReactNode,
    titleBtnAdd?: string,
    size?: 'sm' | 'md' | 'lg' 
}

export default function Header({ title, description, pathList, formComponent, titleBtnAdd = 'Novo', size = 'sm'}: ClientsPageProps) {
    const { openModal } = useModalContext();

    return (
        <section className="flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                {(description) && (<p className="text-muted-foreground">{description}</p>)}
            </div>
            <div>
                {pathList && (
                    <Link href={pathList}>
                        <Button variant="outline" className="mr-2 cursor-pointer">
                            <HugeiconsIcon icon={RotateSquareIcon} className="h-6 w-6" />
                            <span className="sr-only">Atualizar Listagem</span>
                        </Button>
                    </Link>
                )}
                {formComponent && (
                    <Button onClick={() => {
                        openModal(formComponent, (size == 'sm') ? 'sm:max-w-[650px]' : (size == 'md') ? 'sm:max-w-[850px]' : 'sm:max-w-[950px]');
                    }} className="cursor-pointer">
                        <HugeiconsIcon icon={PlusSignSquareIcon} className="h-6 w-6" />
                        {titleBtnAdd}
                    </Button>
                )}
            </div>
        </section >
    )
}