export interface UpsertBudgetDTO {
  id?: string;

  user_id: string;
  client_id: string;
  client_name?: string;
  client_document?: string;
  budget_email?: string;
  budget_phone?: string;
  responsible_client_name?: string;
  observations?: string;

  client_zipcode?: string;
  client_address?: string;
  client_number?: string;
  client_city?: string;
  client_state?: string;

  total: number;
}
