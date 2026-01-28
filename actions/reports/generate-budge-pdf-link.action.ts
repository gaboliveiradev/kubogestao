"use server";

import { auth } from "@/lib/auth";
import { generatePdfToken } from "@/lib/pdf-token";

export async function generateBudgetPdfLink(budgetId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Não autenticado");
  }

  const token = generatePdfToken(budgetId, session.user.id);

  return `/api/reports/budgets/${budgetId}/pdf?token=${token}`;
}
