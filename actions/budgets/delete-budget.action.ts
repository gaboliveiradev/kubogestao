"use server";

import { auth } from "@/lib/auth";
import { budgetItemsService } from "@/services/firebase/budgets/budget-items.service";
import { budgetsService } from "@/services/firebase/budgets/budgets.service";
import { revalidatePath } from "next/cache";

export async function deleteBudget(budgetId: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Você precisa estar logado para realizar esta ação.",
      };
    }

    // 1️⃣ Deleta os itens do orçamento
    await budgetItemsService.deleteItemsByBudgetId(budgetId);

    // 2️⃣ Deleta o orçamento pai
    await budgetsService.deleteBudget(budgetId);

    // 3️⃣ Revalida a listagem
    revalidatePath("/app/budgets");

    return {
      success: true,
      message: "Orçamento excluído com sucesso.",
    };
  } catch (error) {
    console.error("Erro ao deletar orçamento:", error);

    return {
      success: false,
      message: "Erro ao tentar remover o orçamento.",
    };
  }
}
