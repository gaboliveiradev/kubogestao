/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, ChangeEvent, useCallback } from "react";
import { ZodObject } from "zod";

export function useZodFormState<T extends ZodObject<any>>(schema: T) {
  const [values, setValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | { name: string; value: any },
      transform?: (value: any) => any
    ) => {
      const { name, value } = "target" in e ? e.target : e;
      const finalValue = transform ? transform(value) : value;

      setValues((prevValues) => {
        const newValues = { ...prevValues, [name]: finalValue };
        
        // valida só o campo que mudou
        const fieldSchema = schema.pick({ [name]: true });
        const result = fieldSchema.safeParse({ [name]: finalValue });

        setErrors((prev) => {
          if (result.success) {
            return { ...prev, [name]: "" };
          } else {
            return { ...prev, [name]: result.error.issues[0].message };
          }
        });

        return newValues;
      });
    },
    [schema]
  );

  // valida o formulário inteiro (usado no submit)
  const validateAll = useCallback(() => {
    const normalized: Record<string, any> = {};
    for (const key of Object.keys(schema.shape)) {
      const current = values[key];
      if (key === "id") {
        if (current) normalized[key] = current;
        continue;
      }
      normalized[key] = current ?? "";
    }

    const result = schema.safeParse(normalized);
    const nextErrors: Record<string, string> = {};

    if (!result.success) {
      for (const issue of result.error.issues) {
        const key = String(issue.path[0] ?? "");
        if (key && !nextErrors[key]) nextErrors[key] = issue.message;
      }
    }

    setErrors(nextErrors);
    return { valid: result.success, errors: nextErrors };
  }, [schema, values]);

  // limpa erros de campos preenchidos automaticamente (CNPJ/CEP)
  const clearErrors = useCallback((keys: string[]) => {
    setErrors((prev) => {
      const next = { ...prev };
      keys.forEach((k) => delete next[k]);
      return next;
    });
  }, []);

  return { values, errors, handleChange, setValues, validateAll, clearErrors };
}