export function budgetFooter(generatedAt: string) {
  return `
    <div style="
      width: 100%;
      font-size: 14px;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    ">
      <div>
        <br>
        <span style="font-size: 14px;">Orçamento gerado por <b>AppClior</b> @2026</span>
      </div>

      <div style="text-align: right;">
        Data do Orçamento: ${generatedAt}<br />
        Página <span class="pageNumber"></span> de <span class="totalPages"></span>
      </div>
    </div>
  `;
}
