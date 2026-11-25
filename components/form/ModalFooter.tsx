import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Barra de rodapé das modais: ocupa a largura toda (cola nas bordas do Dialog),
 * com fundo diferente, borda no topo e botões alinhados à direita.
 */
export function ModalFooter({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="modal-footer"
            className={cn(
                "col-span-12 -mx-4 -mb-4 mt-2 flex items-center justify-end gap-3 rounded-b-xl border-t bg-muted p-4",
                className
            )}
            {...props}
        />
    );
}

/** Botão maior (h-11) com largura do conteúdo, padrão do rodapé das modais. */
export function ModalFooterButton({ className, ...props }: React.ComponentProps<typeof Button>) {
    return <Button size="lg" className={cn("h-11 cursor-pointer px-6 text-sm", className)} {...props} />;
}
