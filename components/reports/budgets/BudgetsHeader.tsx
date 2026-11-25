export function budgetHeader(logoBase64: string) {
  return `
    <div style="
      width: 100%;
      display: flex;
      padding: 0 20px;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      font-family: Arial, Helvetica, sans-serif;
      -webkit-print-color-adjust: exact;
    ">
      <!-- Left -->
      <div style="width: 320px;">
        <img
          src="${logoBase64}"
          alt="Modelação Império"
          style="width: 160px; display: block;"
        />
      </div>

      <!-- Right -->
      <div style="
        font-size: 11px;
        line-height: 1.5;
        text-align: left;
        color: #374151;
        border-left: 3px solid #475569;
        padding-left: 10px;
      ">
        <div><strong>CNPJ:</strong> 40.959.123/0001-79</div>
        <div><strong>Razão Social:</strong> MODELACAO IMPERIO LTDA</div>
        <div><strong>Email:</strong> robertodevaldo8@gmail.com</div>
      </div>
    </div>
  `;
}
