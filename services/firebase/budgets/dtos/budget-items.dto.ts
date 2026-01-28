export interface BudgetItemDTO {
  id: string;
  budget_id: string;
  name: string;
  quantity: number;
  value: number;
  description?: string;
  created_at?: string;
  updated_at?: string;
}
