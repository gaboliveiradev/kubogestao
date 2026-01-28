"use server";

import { auth } from "@/lib/auth";
import { budgetsService } from "@/services/firebase/budgets/budgets.service";

export async function getBudgets() {
  try {
    const userLogged = await auth();

    if (!userLogged?.user?.id) {
      return {
        success: false,
        message: "Você precisa estar logado para realizar esta ação.",
      };
    }

    const clients = await budgetsService.getBudgets(userLogged.user.id);

    return {
      success: true,
      data: clients,
    };
  } catch (error) {
    console.error("Erro ao listar clientes:", error);

    return {
      success: false,
      data: [],
    };
  }
}
