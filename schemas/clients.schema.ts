import { z } from "zod";

const onlyNumbers = (value: string) => value.replace(/\D/g, "");

const cpfCnpjRegex = /^(\d{11}|\d{14})$/;
const cepRegex = /^\d{8}$/;
const phoneRegex = /^\d{10,11}$/;

export const clientSchema = z.object({
  id: z.string().uuid().optional(),

  // ===== Dados principais =====
  document: z
    .string()
    .min(1, "Documento é obrigatório.")
    .transform(onlyNumbers)
    .refine(value => cpfCnpjRegex.test(value), {
      message: "Informe um CPF ou CNPJ válido.",
    }),

  corporate_name: z
    .string()
    .min(1, "Razão social é obrigatória.")
    .min(3, "Razão social deve ter no mínimo 3 caracteres."),

  fantasy_name: z.string().optional(),

  company_nickname: z.string().optional(),

  responsible_name: z.string().optional(),

  budget_key: z.string().min(1, 'Chave de orçamento é obrigatório.').min(3, 'Chave de orçamento deve ter no mínimo 3 caracteres.'),

  // ===== Endereço =====
  zipcode: z
    .string()
    .min(1, "CEP é obrigatório.")
    .transform(onlyNumbers)
    .refine(value => cepRegex.test(value), {
      message: "CEP inválido.",
    }),

  address: z
    .string()
    .min(1, "Logradouro é obrigatório.")
    .min(3, "Logradouro inválido."),

  number: z
    .string()
    .min(1, "Número é obrigatório."),

  neighborhood: z
    .string()
    .min(1, "Bairro é obrigatório.")
    .min(2, "Bairro inválido."),

  city: z
    .string()
    .min(1, "Cidade é obrigatória.")
    .min(2, "Cidade inválida."),

  state: z
    .string()
    .min(1, "Estado é obrigatório.")
    .length(2, "Informe a UF com 2 caracteres."),

  // ===== Contatos =====
  customer_email: z
    .string()
    .email("E-mail inválido.")
    .optional()
    .or(z.literal('')),

  billing_email: z
    .string()
    .email("E-mail inválido.")
    .optional()
    .or(z.literal('')),

  customer_phone: z
    .string()
    .transform(onlyNumbers)
    .refine(value => !value || phoneRegex.test(value), {
      message: "Telefone inválido.",
    })
    .optional(),

  responsible_phone: z
    .string()
    .transform(onlyNumbers)
    .refine(value => !value || phoneRegex.test(value), {
      message: "Telefone inválido.",
    })
    .optional(),

  billing_phone: z
    .string()
    .transform(onlyNumbers)
    .refine(value => !value || phoneRegex.test(value), {
      message: "Telefone inválido.",
    })
    .optional(),
});

export type ClientFormData = z.infer<typeof clientSchema>;