import { z } from "zod";

const REQUIRED = "Este campo é obrigatório.";

const onlyNumbers = (value: string) => value.replace(/\D/g, "");

const cpfCnpjRegex = /^(\d{11}|\d{14})$/;
const cepRegex = /^\d{8}$/;
const phoneRegex = /^\d{10,11}$/;

export const clientSchema = z.object({
  // IDs do Firestore são alfanuméricos (não UUID)
  id: z.string().min(1).optional(),

  // ===== Dados principais =====
  document: z
    .string()
    .min(1, REQUIRED)
    .transform(onlyNumbers)
    .refine(value => cpfCnpjRegex.test(value), {
      message: "Informe um CPF ou CNPJ válido.",
    }),

  corporate_name: z
    .string()
    .min(1, REQUIRED)
    .min(3, "Razão social deve ter no mínimo 3 caracteres."),

  fantasy_name: z.string().optional(),

  company_nickname: z.string().optional(),

  responsible_name: z.string().optional(),

  budget_key: z.string().min(1, REQUIRED).min(3, 'Chave de orçamento deve ter no mínimo 3 caracteres.'),

  // ===== Endereço =====
  zipcode: z
    .string()
    .min(1, REQUIRED)
    .transform(onlyNumbers)
    .refine(value => cepRegex.test(value), {
      message: "CEP inválido.",
    }),

  address: z
    .string()
    .min(1, REQUIRED)
    .min(3, "Logradouro inválido."),

  number: z
    .string()
    .min(1, REQUIRED),

  neighborhood: z
    .string()
    .min(1, REQUIRED)
    .min(2, "Bairro inválido."),

  city: z
    .string()
    .min(1, REQUIRED)
    .min(2, "Cidade inválida."),

  state: z
    .string()
    .min(1, REQUIRED)
    .length(2, "Informe a UF com 2 caracteres."),

  // ===== Contatos =====
  customer_email: z
    .string()
    .email("Email inválido.")
    .optional()
    .or(z.literal('')),

  billing_email: z
    .string()
    .email("Email inválido.")
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