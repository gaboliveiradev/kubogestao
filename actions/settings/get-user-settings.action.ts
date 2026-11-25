"use server";

import { auth } from "@/lib/auth";
import { userSettingsService } from "@/services/firebase/settings/user-settings.service";
import { DEFAULT_BUDGET_SETTINGS } from "@/utils/functions/budget-placeholders";

export async function getUserSettings() {
  try {
    const userLogged = await auth();

    if (!userLogged?.user?.id) {
      return {
        success: false,
        message: "Você precisa estar logado para realizar esta ação.",
        data: { user_id: "", budget: DEFAULT_BUDGET_SETTINGS },
      };
    }

    const data = await userSettingsService.getSettings(userLogged.user.id);

    return { success: true, data };
  } catch (error) {
    console.error("Erro ao buscar configurações:", error);

    return {
      success: false,
      message: "Ocorreu um erro ao buscar as configurações.",
      data: { user_id: "", budget: DEFAULT_BUDGET_SETTINGS },
    };
  }
}
