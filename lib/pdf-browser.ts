import type { Browser } from "puppeteer-core";

/**
 * Abre o navegador usado para gerar PDFs.
 * - Produção (Vercel/serverless): Chromium compactado do @sparticuz/chromium + puppeteer-core.
 *   O Chrome baixado pelo pacote `puppeteer` não existe nesse ambiente.
 * - Local: Chrome instalado pelo pacote `puppeteer` (devDependency).
 */
export async function launchPdfBrowser(): Promise<Browser> {
  const isServerless = !!process.env.VERCEL || !!process.env.AWS_LAMBDA_FUNCTION_NAME;

  if (isServerless) {
    const [{ default: chromium }, { default: puppeteer }] = await Promise.all([
      import("@sparticuz/chromium"),
      import("puppeteer-core"),
    ]);

    return puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }

  const { default: puppeteer } = await import("puppeteer");

  return (await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  })) as unknown as Browser;
}
