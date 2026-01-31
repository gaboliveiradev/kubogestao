/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect, useRef } from "react"
import IMask, { InputMask } from "imask"
import { Input } from "@/components/ui/input"

interface InputCepProps {
  className?: string
  name: string
  id?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

export function InputCEP({
  className,
  name,
  id,
  placeholder,
  value,
  onChange,
  onBlur,
}: InputCepProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const maskRef = useRef<InputMask | null>(null)

  // Inicializa a máscara
  useEffect(() => {
    if (!inputRef.current) return

    maskRef.current = IMask(inputRef.current, {
      mask: "00.000-000",
      lazy: true,
    })

    // Escuta alterações do IMask
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
      className={className}
      ref={inputRef}
      name={name}
      id={id}
      placeholder={placeholder || "CEP"}
      value={value || ""}
      onChange={() => { }}
      onBlur={onBlur}
    />
  )
}
