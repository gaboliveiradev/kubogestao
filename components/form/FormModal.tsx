import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MenuCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export type Loader = {
    state: boolean,
    message?: string
}

type Props = {
    children: React.ReactNode,
    title: string,
    description?: string,
    loader?: Loader,
    pending?: boolean,
}

export default function FormModal({ children, title, description, loader, pending }: Props) {
    return (
        <>
            <DialogHeader className="text-left">
                <DialogTitle className="font-bold">{title}</DialogTitle>
                {description && <DialogDescription>{description}</DialogDescription>}
            </DialogHeader>
            <div className="grid gap-4">
                {loader?.state || pending ? (
                    <div className='pt-3 flex justify-center items-center flex-col min-h-75'>
                        <HugeiconsIcon icon={MenuCircleIcon} className="w-14 h-14 animate-spin" />
                        {loader?.message && (
                            <span className="ml-4 text-lg font-medium text-stone-700 dark:text-stone-300 pt-4">{loader.message}</span>
                        )}
                    </div>
                ) : (
                    children
                )}
            </div>
        </>
    );
}