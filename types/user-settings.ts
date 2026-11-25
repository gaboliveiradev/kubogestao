export type DeliveryDaysType = "business" | "calendar";

export interface BudgetSettings {
  /** Observação padrão (HTML) com placeholders, ex.: {{valor_50}} */
  default_observation: string;
  /** Prazo de entrega padrão, em dias */
  default_delivery_days: number;
  /** Dias úteis ou corridos */
  delivery_days_type: DeliveryDaysType;
  /** Validade do orçamento, em dias */
  validity_days: number;
  /** Aplicar a observação padrão automaticamente em novos orçamentos */
  auto_apply_observation: boolean;
}

/** Documento da coleção `user_settings` (id do documento = id do usuário) */
export interface UserSettings {
  id: string;
  user_id: string;
  budget: BudgetSettings;
  created_at?: FirebaseFirestore.Timestamp;
  updated_at?: FirebaseFirestore.Timestamp;
}
