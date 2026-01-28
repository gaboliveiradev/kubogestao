export interface BudgetItem {
  id: string;
  budget_id: string;

  name: string;
  quantity: number;
  value: number;
  description?: string;

  created_at?: FirebaseFirestore.Timestamp;
  updated_at?: FirebaseFirestore.Timestamp;
}
