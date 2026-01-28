"use server";

import { auth } from "@/lib/auth";
import { budgetsService } from "@/services/firebase/budgets/budgets.service";

export async function getBudgetById(id: string) {
  try {
    const userLogged = await auth();

    if (!userLogged?.user?.id) {
      return {
        success: false,
        message: "Você precisa estar logado para realizar esta ação.",
      };
    }

    const budget = await budgetsService.getBudgetById(id);

    if (!budget) {
      return {
        success: false,
        message: "Nenhum orçamento encontrado pelo ID",
        data: null,
      };
    }

    return {
      success: true,
      data: budget,
    };
  } catch (error) {
    console.error("Erro ao buscar orçamento pelo ID:", error);

    return {
      success: false,
      message: "Ocorreu um erro ao tentar buscar o orçamento pelo ID.",
    };
  }
}
