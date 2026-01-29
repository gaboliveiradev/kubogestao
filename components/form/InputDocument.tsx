/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useRef } from "react"
import IMask, { InputMask } from "imask"
import { Input } from "@/components/ui/input"

interface InputDocumentProps {
  name: string
  id?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

export function InputDocument({
  name,
  id,
  placeholder,
  value,
  onChange,
  onBlur,
}: InputDocumentProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const maskRef = useRef<InputMask | null>(null)

  // Inicializa a máscara dinâmica CPF/CNPJ
  useEffect(() => {
    if (!inputRef.current) return

    maskRef.current = IMask(inputRef.current, {
      mask: [
        {
          mask: "000.000.000-00",
          maxLength: 11,
        },
        {
          mask: "00.000.000/0000-00",
          maxLength: 14,
        },
      ],
      dispatch: (appended: any, dynamicMasked: { value: any; compiledMasks: any[] }) => {
        const value = (dynamicMasked.value + appended).replace(/\D/g, "")

        return dynamicMasked.compiledMasks.find((m) => {
          return value.length <= (m as { maxLength: number }).maxLength
        })
      },
    })

    // Dispara onChange quando a máscara muda
    maskRef.current.on("accept", () => {
      if (!onChange || !inputRef.current) return

      onChange({
        target: {
          name,
          value: maskRef.current?.value ?? "",
        },
      } as React.ChangeEvent<HTMLInputElement>)
    })


    return () => {
      maskRef.current?.destroy()
      maskRef.current = null
    }
  }, [])

  // Sincroniza value externo → máscara
  useEffect(() => {
    if (!maskRef.current) return

    if (value !== maskRef.current.value) {
      maskRef.current.value = value || ""
    }
  }, [value])

  return (
    <Input
      ref={inputRef}
      name={name}
      id={id}
      placeholder={placeholder || "CPF ou CNPJ"}
      value={value || ""}
      onChange={() => { }}
      onBlur={onBlur}
    />
  )
}