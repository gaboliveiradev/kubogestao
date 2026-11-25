/* eslint-disable @typescript-eslint/no-explicit-any */
import { RichTextEditor } from "@/components/rich-text-editor/RichTextEditor"
import { Button } from "@/components/ui/button";
import { AiMagicIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { ChangeEvent } from "react";

type ObservationTabProps = {
    values: any
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | { name: string; value: any }) => void;
    hasDefaultObservation?: boolean
    onApplyDefaultObservation?: () => void
}

export default function ObservationTab({ values, handleChange, hasDefaultObservation, onApplyDefaultObservation }: ObservationTabProps) {
    return (
        <div className="col-span-12 grid grid-cols-12 gap-x-4 gap-y-3 mt-2">
            <div className='lg:col-span-12 col-span-12 flex flex-wrap items-center justify-between gap-2'>
                <p className="text-xs text-muted-foreground">
                    Modelo definido em{" "}
                    <Link href="/app/settings#budget" target="_blank" className="underline underline-offset-2">
                        Configurações
                    </Link>
                    .
                </p>
                {hasDefaultObservation && (
                    <Button type="button" variant="outline" size="sm" className="cursor-pointer" onClick={onApplyDefaultObservation}>
                        <HugeiconsIcon icon={AiMagicIcon} />
                        Aplicar observação padrão
                    </Button>
                )}
            </div>
            <div className='lg:col-span-12 col-span-12'>
                <RichTextEditor
                    value={values.observations}
                    onChange={(html: any) => handleChange({ target: { name: "observations", value: html } } as any)}
                />
            </div>
        </div>
    )
}
