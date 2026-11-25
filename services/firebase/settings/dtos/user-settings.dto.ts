import { BudgetSettings } from "@/types/user-settings";

export interface UserSettingsDTO {
  user_id: string;
  budget: BudgetSettings;
  updated_at?: string;
}
