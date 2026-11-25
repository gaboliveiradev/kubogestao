import { BudgetSettings } from "@/types/user-settings";

export type PlaceholderDef = {
  key: string;
  label: string;
  description: string;
  group: "Valores" | "Prazos" | "Orçamento";
};

/** Chaves disponíveis para a observação. Use {{valor_N}} para qualquer porcentagem (ex.: {{valor_30}}). */
export const BUDGET_PLACEHOLDERS: PlaceholderDef[] = [
  { key: "valor_100", label: "Valor total", description: "100% do valor do orçamento", group: "Valores" },
  { key: "valor_50", label: "50% do valor", description: "Metade do valor (entrada/entrega)", group: "Valores" },
  { key: "valor_30", label: "30% do valor", description: "30% do valor do orçamento", group: "Valores" },
  { key: "prazo_entrega", label: "Prazo de entrega", description: "Ex.: 30 dias úteis", group: "Prazos" },
  { key: "validade", label: "Validade", description: "Ex.: 60 dias", group: "Prazos" },
  { key: "validade_data", label: "Válido até", description: "Data limite de validade", group: "Prazos" },
  { key: "cliente", label: "Nome do cliente", description: "Razão social do cliente", group: "Orçamento" },
  { key: "codigo_orcamento", label: "Código do orçamento", description: "Ex.: ORC-0001", group: "Orçamento" },
  { key: "data", label: "Data de hoje", description: "Data de emissão", group: "Orçamento" },
];

export const DEFAULT_OBSERVATION = [
  "<p><strong>FORMA DE PAGAMENTO:</strong></p>",
  "<p>- 50% de entrada ({{valor_50}})</p>",
  "<p>- 50% na entrega ({{valor_50}})</p>",
  "<p>- Prazo de entrega: {{prazo_entrega}} após a entrada</p>",
  "<p></p>",
  "<p><strong>DADOS BANCÁRIOS:</strong></p>",
  "<p>- Banco: </p>",
  "<p>- Agência / Conta: </p>",
  "<p>- Chave PIX: </p>",
  "<p></p>",
  "<p><strong>ORÇAMENTO VÁLIDO POR {{validade}}</strong> (até {{validade_data}})</p>",
].join("");

export const DEFAULT_BUDGET_SETTINGS: BudgetSettings = {
  default_observation: DEFAULT_OBSERVATION,
  default_delivery_days: 30,
  delivery_days_type: "business",
  validity_days: 60,
  auto_apply_observation: true,
};

export type PlaceholderContext = {
  total: number;
  settings: Pick<BudgetSettings, "default_delivery_days" | "delivery_days_type" | "validity_days">;
  clientName?: string;
  budgetKey?: string;
  today?: Date;
};

const brl = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function formatDays(days: number, type?: BudgetSettings["delivery_days_type"]) {
  const unit = days === 1 ? "dia" : "dias";
  if (!type) return `${days} ${unit}`;
  const kind = type === "business" ? (days === 1 ? "útil" : "úteis") : (days === 1 ? "corrido" : "corridos");
  return `${days} ${unit} ${kind}`;
}

/** Substitui {{chaves}} por valores reais. Chaves desconhecidas são mantidas como estão. */
export function resolveBudgetPlaceholders(template: string, ctx: PlaceholderContext): string {
  const today = ctx.today ?? new Date();
  const { default_delivery_days, delivery_days_type, validity_days } = ctx.settings;

  const validUntil = new Date(today);
  validUntil.setDate(validUntil.getDate() + validity_days);

  return template.replace(/\{\{\s*([a-z_0-9]+)\s*\}\}/gi, (match, rawKey: string) => {
    const key = rawKey.toLowerCase();

    const percent = key.match(/^valor_(\d{1,3})$/);
    if (percent) {
      const pct = Number(percent[1]);
      return pct > 100 ? match : brl((ctx.total * pct) / 100);
    }

    switch (key) {
      case "prazo_entrega":
        return formatDays(default_delivery_days, delivery_days_type);
      case "validade":
        return formatDays(validity_days);
      case "validade_data":
        return validUntil.toLocaleDateString("pt-BR");
      case "cliente":
        return ctx.clientName ? escapeHtml(ctx.clientName) : "[cliente]";
      case "codigo_orcamento":
        return ctx.budgetKey ? escapeHtml(ctx.budgetKey) : "[código]";
      case "data":
        return today.toLocaleDateString("pt-BR");
      default:
        return match;
    }
  });
}
