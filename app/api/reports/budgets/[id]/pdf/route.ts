/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";
import { budgetsService } from "@/services/firebase/budgets/budgets.service";
import { launchPdfBrowser } from "@/lib/pdf-browser";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { budgetHeader } from "@/components/reports/budgets/BudgetsHeader";
import { budgetFooter } from "@/components/reports/budgets/BudgetsFooter";
import { NextResponse } from "next/server";
import { BudgetPDFContent } from "@/components/reports/budgets/BudgetPDFContent";
import { budgetItemsService } from "@/services/firebase/budgets/budget-items.service";

// Gerar PDF com Chromium pode demorar (cold start na Vercel)
export const runtime = "nodejs";
export const maxDuration = 60;

// Logo lido do disco (sem depender de rede/serviços externos na hora de gerar o PDF)
async function loadLogoBase64(): Promise<string> {
  try {
    const file = await readFile(path.join(process.cwd(), "assets", "pdf", "logo-empresa.png"));
    return `data:image/png;base64,${file.toString("base64")}`;
  } catch (error) {
    console.error("Logo do PDF não encontrado:", error);
    return "";
  }
}

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

  const logoBase64 = await loadLogoBase64();

  const html = `
    <html>
      <body>
        ${BudgetPDFContent(budget, budgetItems)}
      </body>
    </html>
  `;

  let browser: Awaited<ReturnType<typeof launchPdfBrowser>> | undefined;

  try {
    browser = await launchPdfBrowser();

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "load" });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: budgetHeader(logoBase64),
      footerTemplate: budgetFooter(
        new Date().toLocaleDateString("pt-BR")
      ),
      margin: { top: "18mm", bottom: "28mm", left: "3mm", right: "3mm" },
    });

    return new NextResponse(Buffer.from(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename=OR_${budget.budget_key}.pdf`,
      },
    });
  } catch (error) {
    console.error("Erro ao gerar PDF do orçamento:", error);

    return NextResponse.json({ error: "Não foi possível gerar o PDF." }, { status: 500 });
  } finally {
    await browser?.close();
  }
}
