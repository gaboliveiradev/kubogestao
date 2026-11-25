import { FirestoreBaseService } from "@/services/firebase/base/firestore-base.service";
import { BudgetSettings, UserSettings } from "@/types/user-settings";
import { DEFAULT_BUDGET_SETTINGS } from "@/utils/functions/budget-placeholders";
import { UserSettingsDTO } from "./dtos/user-settings.dto";

/**
 * Coleção `user_settings`: um documento por usuário, com o próprio user_id como ID.
 * Leitura/escrita direta por ID (sem queries nem índices compostos).
 */
class UserSettingsService extends FirestoreBaseService<UserSettings> {
  constructor() {
    super("user_settings");
  }

  async getSettings(userId: string): Promise<UserSettingsDTO> {
    const data = await super.getById(userId);

    return {
      user_id: userId,
      // merge com defaults: campos novos no futuro não quebram documentos antigos
      budget: { ...DEFAULT_BUDGET_SETTINGS, ...(data?.budget ?? {}) },
      updated_at: data?.updated_at?.toDate().toISOString(),
    };
  }

  async saveBudgetSettings(userId: string, budget: BudgetSettings) {
    return super.upsert(userId, { user_id: userId, budget });
  }
}

export const userSettingsService = new UserSettingsService();
