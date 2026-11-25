import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pacotes com binários nativos não podem ser empacotados pelo Next (geração de PDF)
  serverExternalPackages: ["@sparticuz/chromium", "puppeteer-core", "puppeteer"],
  // Garante que o logo e o binário do Chromium sejam incluídos no bundle serverless da rota
  outputFileTracingIncludes: {
    "/api/reports/budgets/[id]/pdf": ["./assets/pdf/**/*", "./node_modules/@sparticuz/chromium/bin/**/*"],
  },
};

export default nextConfig;
