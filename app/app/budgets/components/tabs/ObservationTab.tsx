/* eslint-disable @typescript-eslint/no-explicit-any */
import { RichTextEditor } from "@/components/rich-text-editor/RichTextEditor"
import { ChangeEvent } from "react";

type ObservationTabProps = {
    values: any
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | { name: string; value: any }) => void;
}

export default function ObservationTab({ values, handleChange }: ObservationTabProps) {
    return (
        <div className="col-span-12 grid grid-cols-12 gap-x-4 gap-y-3 mt-2">
            <div className='lg:col-span-12 col-span-12'>
                <RichTextEditor
                    value={values.observations}
                    onChange={(html: any) => handleChange({ target: { name: "observations", value: html } } as any)}
                />
            </div>
        </div>
    )
}