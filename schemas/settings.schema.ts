import { z } from "zod";

export const budgetSettingsSchema = z.object({
  default_observation: z
    .string()
    .max(10000, "A observação padrão pode ter no máximo 10.000 caracteres."),

  default_delivery_days: z.coerce
    .number({ message: "Informe um número válido." })
    .int("Informe um número inteiro.")
    .min(1, "O prazo mínimo é de 1 dia.")
    .max(730, "O prazo máximo é de 730 dias."),

  delivery_days_type: z.enum(["business", "calendar"], { message: "Tipo de prazo inválido." }),

  validity_days: z.coerce
    .number({ message: "Informe um número válido." })
    .int("Informe um número inteiro.")
    .min(1, "A validade mínima é de 1 dia.")
    .max(730, "A validade máxima é de 730 dias."),

  auto_apply_observation: z.enum(["true", "false"]).transform((v) => v === "true"),
});

export type BudgetSettingsSchema = z.infer<typeof budgetSettingsSchema>;
