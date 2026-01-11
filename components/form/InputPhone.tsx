/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useRef } from "react"
import IMask, { InputMask } from "imask"
import { Input } from "@/components/ui/input"

interface InputPhoneProps {
    name: string
    id?: string
    placeholder?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function InputPhone({
    name,
    id,
    placeholder,
    value,
    onChange
}: InputPhoneProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const maskRef = useRef<InputMask | null>(null)

    // cria a máscara
    useEffect(() => {
        if (!inputRef.current) return

        maskRef.current = IMask(inputRef.current, {
            mask: [
                { mask: "(00) 0000-0000" },
                { mask: "(00) 00000-0000" },
            ],
            dispatch: (appended: any, dynamicMasked: { value: any; compiledMasks: any[] }) => {
                const number = (dynamicMasked.value + appended).replace(/\D/g, "")
                return number.length > 10
                    ? dynamicMasked.compiledMasks[1]
                    : dynamicMasked.compiledMasks[0]
            },
            lazy: false,
        })

        maskRef.current.on("accept", () => {
            onChange?.({
                target: {
                    name,
                    value: maskRef.current?.value || "",
                },
            } as React.ChangeEvent<HTMLInputElement>)
        })

        return () => {
            maskRef.current?.destroy()
            maskRef.current = null
        }
    }, [name, onChange])

    // sincroniza valor externo → máscara
    useEffect(() => {
        if (!maskRef.current) return
        if (value === undefined) return

        if (maskRef.current.value !== value) {
            maskRef.current.value = value
        }
    }, [value])

    return (
        <Input
            ref={inputRef}
            name={name}
            id={id}
            placeholder={placeholder || "Telefone"}
        />
    )
}
