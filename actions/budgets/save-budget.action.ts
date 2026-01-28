/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { auth } from "@/lib/auth";
import { budgetSchema } from "@/schemas/budgets.schema";
import { budgetsService } from "@/services/firebase/budgets/budgets.service";
import { budgetItemsService } from "@/services/firebase/budgets/budget-items.service";
import { ServiceResponse } from "@/types/service-response";
import { revalidatePath } from "next/cache";

export async function upsertBudget(_: ServiceResponse, formData: FormData): Promise<ServiceResponse<{ id: string }>> {
  try {
    const userLogged = await auth();

    if (!userLogged?.user?.id) {
      return {
        success: false,
        message: "Você precisa estar logado para realizar esta ação.",
      };
    }

    const raw = Object.fromEntries(formData.entries());
    const parsed = budgetSchema.safeParse(raw);

    if (!parsed.success) {
      return {
        success: false,
        message: "Erro de validação",
        errors: parsed.error.flatten().fieldErrors as Record<string, string>,
      };
    }

    const items = JSON.parse(String(raw.items ?? "[]"));

    const total = items.reduce(
      (acc: number, item: any) => acc + item.quantity * item.value,
      0
    );

    const budget = await budgetsService.saveBudget({
      ...parsed.data,
      user_id: userLogged.user.id,
      total,
    });

    // remove itens antigos (update)
    await budgetItemsService.deleteItemsByBudgetId(budget.id);

    // recria itens
    for (const item of items) {
      await budgetItemsService.saveItemBudget({
        budget_id: budget.id,
        name: item.name,
        quantity: item.quantity,
        value: item.value,
        description: item.description,
      });
    }

    revalidatePath('/app/budgets');

    return {
      success: true,
      message: "Orçamento salvo com sucesso",
      data: { id: budget.id },
    };
  } catch (error) {
    console.error("Erro ao salvar o orçamento:", error);

    return {
      success: false,
      message: "Erro ao tentar salvar o orçamento",
    };
  }
}
