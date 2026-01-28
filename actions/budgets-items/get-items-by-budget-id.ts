"use server";

import { auth } from "@/lib/auth";
import { budgetItemsService } from "@/services/firebase/budgets/budget-items.service";

export async function getItemsByBudgetId(id: string) {
  try {
    const userLogged = await auth();

    if (!userLogged?.user?.id) {
      return {
        success: false,
        message: "Você precisa estar logado para realizar esta ação.",
      };
    }

    const budget = await budgetItemsService.getItemsByBudgetId(id);

    if (!budget) {
      return {
        success: false,
        message: "Nenhum item do orçamento encontrado pelo ID",
        data: null,
      };
    }

    return {
      success: true,
      data: budget,
    };
  } catch (error) {
    console.error("Erro ao buscar itens do orçamento pelo ID:", error);

    return {
      success: false,
      message: "Ocorreu um erro ao tentar buscar os itens do orçamento pelo ID.",
    };
  }
}
