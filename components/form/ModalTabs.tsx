"use client";

import * as React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

/** Lista de tabs em formato segmentado (pílula), padrão das modais. */
export function ModalTabsList({ className, ...props }: React.ComponentProps<typeof TabsList>) {
    return (
        <TabsList
            className={cn(
                "flex w-full gap-1 rounded-xl bg-muted p-1 group-data-horizontal/tabs:h-auto",
                className
            )}
            {...props}
        />
    );
}

export function ModalTabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsTrigger>) {
    return (
        <TabsTrigger
            className={cn("h-10 min-w-0 cursor-pointer rounded-lg px-2 py-0", className)}
            {...props}
        />
    );
}
