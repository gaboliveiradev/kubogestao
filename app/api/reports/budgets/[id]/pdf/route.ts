/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";
import { budgetsService } from "@/services/firebase/budgets/budgets.service";
import puppeteer from "puppeteer";
import { budgetHeader } from "@/components/reports/budgets/BudgetsHeader";
import { budgetFooter } from "@/components/reports/budgets/BudgetsFooter";
import { NextResponse } from "next/server";
import { BudgetPDFContent } from "@/components/reports/budgets/BudgetPDFContent";
import { budgetItemsService } from "@/services/firebase/budgets/budget-items.service";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const token = new URL(request.url).searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token ausente" }, { status: 401 });
  }

  let payload: any;

  try {
    payload = jwt.verify(token, process.env.PDF_SECRET!);
  } catch {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }

  if (payload.budgetId !== id) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }

  const budget = await budgetsService.getBudgetById(id);
  const budgetItems = await budgetItemsService.getItemsByBudgetId(id);

  if (!budget) {
    return NextResponse.json({ error: "Orçamento não encontrado" }, { status: 404 });
  }

  if (!budgetItems) {
    return NextResponse.json({ error: "Itens do orçamento não encontrado" }, { status: 404 });
  }

  const html = `
    <html>
      <body>
        ${BudgetPDFContent(budget, budgetItems)}
      </body>
    </html>
  `;

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: budgetHeader(),
    footerTemplate: budgetFooter(
      new Date().toLocaleDateString("pt-BR")
    ),
    margin: { top: "18mm", bottom: "28mm", left: "3mm", right: "3mm" },
  });

  await browser.close();

  return new NextResponse(Buffer.from(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename=OR_${budget.budget_key}.pdf`,
    },
  });
}
