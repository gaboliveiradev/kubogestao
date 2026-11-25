import { BudgetItemDTO } from "@/services/firebase/budgets/dtos/budget-items.dto";
import { BudgetDTO } from "@/services/firebase/budgets/dtos/budgets.dto";
import { formatCurrency, formatDocument, formatPhone } from "@/utils/functions/string";

export function BudgetPDFContent(data: BudgetDTO, budgetItems: BudgetItemDTO[]) {
  const budgetKey = data.budget_key;

  const document = formatDocument(data.client_document) || 'Sem documento';
  const clientName = data.client_name || 'Sem nome';
  const responsible = data.responsible_client_name || 'Sem responsável';
  const email = data.budget_email || 'Sem email';
  const phone = formatPhone(data.budget_phone || '') || 'Sem telefone';

  const zipcode = data.client_zipcode || 'Sem CEP';
  const address = data.client_address || 'Sem endereço';
  const number = data.client_number || 'Sem número'
  const cityState = data.client_city ? `${data.client_city} - ${data.client_state}` : 'Sem cidade';

  const totalService = formatCurrency(data.total || 0);

  const observation = data.observations;

  return `
    <style>
        :root {
          --ink: #111827;
          --muted: #6b7280;
          --line: #e5e7eb;
          --line-strong: #cbd5e1;
          --surface: #f8fafc;
          --accent: #475569;
        }

        * {
          box-sizing: border-box;
        }

        body {
          font-family: Arial, Helvetica, sans-serif;
          font-size: 12px;
          color: var(--ink);
          margin: 0;
          padding: 0 20px;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        section {
          margin-top: 18px;
        }

        h2 {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--accent);
          margin: 0 0 8px;
        }

        h2::before {
          content: "";
          width: 4px;
          height: 14px;
          border-radius: 2px;
          background: var(--accent);
        }

        .budgetKey {
          margin-top: 0;
          padding: 12px 16px;
          border-radius: 6px;
          background: var(--accent) !important;
          color: #fff;
          text-align: center;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.1em;
        }

        .box,
        .card {
          border: 1px solid var(--line-strong);
          border-radius: 6px;
          overflow: hidden;
        }

        .row {
          display: grid;
          border-bottom: 1px solid var(--line);
        }

        .row:last-child {
          border-bottom: none;
        }

        .row:nth-child(odd) {
          background: var(--surface);
        }

        .info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 6px 10px;
          font-size: 13px;
          min-width: 0;
          word-break: break-word;
        }

        .info span:not(.label) {
          text-transform: uppercase;
        }

        td.service-name,
        td.service-description {
          text-transform: uppercase;
        }

        .info.border-right {
          border-right: 1px solid var(--line);
        }

        .label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
          white-space: nowrap;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }

        thead {
          display: table-header-group;
        }

        th {
          padding: 8px 10px;
          background: var(--accent) !important;
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-align: left;
        }

        td {
          padding: 7px 10px;
          vertical-align: top;
          border-bottom: 1px solid var(--line);
        }

        tr {
          page-break-inside: avoid;
        }

        tbody tr:nth-child(even) td {
          background: #eef1f5 !important;
        }

        .text-right {
          text-align: right;
        }

        .text-center {
          text-align: center;
        }

        .total {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          background: var(--accent) !important;
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          page-break-inside: avoid;
        }

        .total-label {
          font-size: 10px;
          letter-spacing: 0.08em;
          color: #cbd5e1;
        }

        .observation {
          padding: 10px 12px;
          font-size: 13px;
          line-height: 1.5;
          white-space: pre-line;
        }
    </style>

    <main>
      <!-- Código do Orçamento -->
      <section class="budgetKey">
        ORÇAMENTO ${budgetKey}
      </section>

      <!-- Dados do Cliente -->
      <section>
        <h2>Dados do Cliente</h2>
    
        <div class="box">
          <div class="row" style="grid-template-columns: 3fr 8fr;">
            ${info("CNPJ", document, true)}
            ${info("CLIENTE", clientName)}
          </div>
    
          <div class="row" style="grid-template-columns: 3fr 5fr 3fr;">
            ${info("A/C", responsible, true)}
            ${info("EMAIL", email, true)}
            ${info("TEL.", phone)}
          </div>
    
          <div class="row" style="grid-template-columns: 2fr 4fr 2fr 3fr;">
            ${info("CEP", zipcode, true)}
            ${info("END", address, true)}
            ${info("Nº", number, true)}
            ${info("CIDADE", cityState)}
          </div>
        </div>
      </section>
    
      <!-- Serviços -->
      <section>
        <h2>Descrição dos Serviços</h2>
    
        <div class="card">
          <div>
            <table>
              <thead>
                <tr>
                  <th style="width:30%">NOME</th>
                  <th style="width:50%">DESCRIÇÃO</th>
                  <th style="width:5%" class="text-center">QTD</th>
                  <th style="width:15%" class="text-right">VALOR (R$)</th>
                </tr>
              </thead>
              <tbody>
                ${budgetItems.map(item => `
                  <tr>
                    <td class="service-name">${item.name}</td>
                    <td class="service-description">${item.description ?? ""}</td>
                    <td class="text-center">${item.quantity}</td>
                    <td class="text-right">${formatCurrency(item.value)}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
    
            <div class="total"><span class="total-label">TOTAL</span>${totalService}</div>
          </div>
        </div>
      </section>

      <!-- Observações -->
      ${observation
      ? `
        <section>
          <h2>Observações</h2>

          <div class="card">
            <div class="observation">${observation}</div>
          </div>
        </section>
        `
      : ``}
    </main>
  `;
}

function info(label: string, value: string, borderRight = false) {
  return `
    <div class="info ${borderRight ? "border-right" : ""}">
      <span class="label">${label}</span>
      <span>${value}</span>
    </div>
  `;
}
