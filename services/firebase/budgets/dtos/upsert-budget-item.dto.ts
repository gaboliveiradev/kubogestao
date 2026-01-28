export interface UpsertBudgetItemDTO {
  id?: string;
  budget_id: string;

  name: string;
  quantity: number;
  value: number;
  description?: string;
}
