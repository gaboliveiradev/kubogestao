'use server';

import { auth } from "@/lib/auth"; // ajuste conforme seu projeto
import { budgetsService } from "@/services/firebase/budgets/budgets.service";

export async function getBudgetsCount() {
  const userLogged = await auth();

  if (!userLogged?.user?.id) return 0;

  return await budgetsService.countBudgets(userLogged.user.id);
}

export async function getBudgetsSumTotal() {
  const userLogged = await auth();

  if (!userLogged?.user?.id) return 0;
  
  return await budgetsService.sumBudgetsTotal(userLogged.user.id);
}