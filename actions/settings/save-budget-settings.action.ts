"use server";

import { auth } from "@/lib/auth";
import { budgetSettingsSchema } from "@/schemas/settings.schema";
import { userSettingsService } from "@/services/firebase/settings/user-settings.service";
import { ServiceResponse } from "@/types/service-response";
import { revalidatePath } from "next/cache";

export async function saveBudgetSettings(_: ServiceResponse, formData: FormData): Promise<ServiceResponse> {
  try {
    const userLogged = await auth();

    if (!userLogged?.user?.id) {
      return { success: false, message: "Você precisa estar logado para realizar esta ação." };
    }

    const parsed = budgetSettingsSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!parsed.success) {
      return {
        success: false,
        message: "Erro de validação",
        errors: parsed.error.flatten().fieldErrors as Record<string, string>,
      };
    }

    await userSettingsService.saveBudgetSettings(userLogged.user.id, parsed.data);

    revalidatePath("/app/settings");

    return { success: true, message: "Configurações salvas com sucesso" };
  } catch (error) {
    console.error("Erro ao salvar configurações:", error);

    return { success: false, message: "Erro ao tentar salvar as configurações" };
  }
}
