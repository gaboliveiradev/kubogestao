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

  return { values, errors, handleChange, setValues };
}