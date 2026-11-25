export function budgetFooter(generatedAt: string) {
  return `
    <div style="
      width: 100%;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 10px;
      color: #6b7280;
      padding: 0 20px;
    ">
      <div style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #cbd5e1;
        padding-top: 6px;
      ">
        <span>Orçamento gerado por <b style="color: #475569;">KuboGestao</b> @2026</span>

        <div style="text-align: right;">
          Data do Orçamento: ${generatedAt}<br />
          Página <span class="pageNumber"></span> de <span class="totalPages"></span>
        </div>
      </div>
    </div>
  `;
}
