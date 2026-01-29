import { z } from "zod";

const onlyNumbers = (value: string) => value.replace(/\D/g, "");

const cpfCnpjRegex = /^(\d{11}|\d{14})$/;
const cepRegex = /^\d{8}$/;
const phoneRegex = /^\d{10,11}$/;

export const budgetSchema = z.object({
  id: z.string().optional(),

  client_id: z
    .string()
    .min(1, "Cliente é obrigatório")
    .refine((val) => val !== "-1", {
      message: "Selecione um cliente válido",
    }),

  observations: z
    .string()
    .max(1000, "Observações podem ter no máximo 1000 caracteres")
    .optional()
    .or(z.literal("")),

  budget_key: z.string().min(1, 'Chave de orçamento é obrigatório.').min(3, 'Chave de orçamento deve ter no mínimo 3 caracteres.'),

  client_document: z
    .string()
    .min(1, "Documento é obrigatório.")
    .transform(onlyNumbers)
    .refine(value => cpfCnpjRegex.test(value), {
      message: "Informe um CPF ou CNPJ válido.",
    }),

  client_name: z
    .string()
    .min(1, "Razão social é obrigatória.")
    .min(3, "Razão social deve ter no mínimo 3 caracteres."),

  responsible_client_name: z.string().min(1, "Nome do responsável é obrigatório."),

  budget_email: z
    .string()
    .email("E-mail inválido.")
    .optional()
    .or(z.literal('')),

  budget_phone: z
    .string()
    .transform(onlyNumbers)
    .refine(value => !value || phoneRegex.test(value), {
      message: "Telefone inválido.",
    })
    .optional(),

  client_zipcode: z
    .string()
    .min(1, "CEP é obrigatório.")
    .transform(onlyNumbers)
    .refine(value => cepRegex.test(value), {
      message: "CEP inválido.",
    }),

  client_address: z
    .string()
    .min(1, "Logradouro é obrigatório.")
    .min(3, "Logradouro inválido."),

  client_number: z
    .string()
    .min(1, "Número é obrigatório."),

  client_city: z
    .string()
    .min(1, "Cidade é obrigatória.")
    .min(2, "Cidade inválida."),

  client_state: z
    .string()
    .min(1, "Estado é obrigatório.")
    .length(2, "Informe a UF com 2 caracteres."),
});

export type BudgetSchema = z.infer<typeof budgetSchema>;
