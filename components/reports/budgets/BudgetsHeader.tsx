export function budgetHeader() {
  return `
    <div style="
      width: 100%;
      display: flex;
      padding: 0 20px;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;
      font-family: Arial, Helvetica, sans-serif;
    ">
      <!-- Left -->
      <div>
        <div style="
          font-size: 24px;
          font-weight: bold;
          letter-spacing: -0.5px;
        ">
          MODELAÇÃO IMPÉRIO
        </div>
      </div>

      <!-- Right -->
      <div style="
        font-size: 14px;
        text-align: left;
      ">
        <div><strong>CNPJ:</strong> 40.959.123/0001-79</div>
        <div><strong>Razão Social:</strong> MODELACAO IMPERIO LTDA</div>
        <div><strong>Email:</strong> robertodevaldo8@gmail.com</div>
      </div>
    </div>
  `;
}
