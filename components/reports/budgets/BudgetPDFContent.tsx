import { BudgetDTO } from "@/services/firebase/budgets/dtos/budgets.dto";
import { formatCurrency, formatDocument, formatPhone } from "@/utils/functions/string";

export function BudgetPDFContent(data: BudgetDTO) {

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

  const observation = data.observations || 'Sem observações';

  return `
    <style>
        body {
          font-family: Arial, Helvetica, sans-serif;
          font-size: 12px;
          color: #000;
        }

        h2 {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 6px;
        }

        section {
          margin-top: 16px;
        }

        .box {
            border: 1px solid #bfbdbd !important;
        }

        .row {
          display: grid;
          border-bottom: 1px solid #bfbdbd !important;
        }
    
        .row:last-child {
          border-bottom: none !important;
        }
    
        .info {
          display: flex;
          gap: 4px;
          padding: 4px 8px;
          font-size: 14px;
        }
    
        .info.border-right {
          border-right: 1px solid #bfbdbd !important;
        }
    
        .label {
          font-weight: 600;
          white-space: nowrap;
        }
    
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }
    
        thead {
          background: #f3f4f6;
        }
    
        th, td {
          padding: 4px 8px;
          border-bottom: 1px solid #d1d5db;
          border-right: 1px solid #d1d5db;
        }
    
        th:last-child,
        td:last-child {
          border-right: none;
        }
    
        th {
          text-align: left;
          font-weight: 600;
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
          padding: 4px 8px;
          font-weight: 600;
          font-size: 14px !important;
        }
    
        .card {
          border: 1px solid #bfbdbd !important;
        }
    
        .card-content {
          padding: 0;
        }

        .card-content-observation p {
          font-size: 14px !important;
          padding: 0px 12px !important;
        }
    </style>

    <main>
      <!-- Dados do Cliente -->
      <section>
        <h2>Dados do Cliente</h2>
    
        <div class="box">
          <div class="row" style="grid-template-columns: 3fr 8fr;">
            ${info("CNPJ", document, true)}
            ${info("Cliente", clientName)}
          </div>
    
          <div class="row" style="grid-template-columns: 3fr 5fr 3fr;">
            ${info("A/C", responsible, true)}
            ${info("Email", email, true)}
            ${info("Tel.", phone)}
          </div>
    
          <div class="row" style="grid-template-columns: 2fr 4fr 2fr 3fr;">
            ${info("CEP", zipcode, true)}
            ${info("End", address, true)}
            ${info("Nº", number, true)}
            ${info("Cidade", cityState)}
          </div>
        </div>
      </section>
    
      <!-- Serviços -->
      <section>
        <h2>Descrição dos Serviços</h2>
    
        <div class="card">
          <div class="card-content">
            <table>
              <thead>
                <tr>
                  <th style="width:30%">Nome</th>
                  <th style="width:50%">Descrição</th>
                  <th style="width:5%" class="text-center">Qtd</th>
                  <th style="width:15%" class="text-right">Valor (R$)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Encosto com costura 144R</td>
                  <td>Molde em alumínio fundido com serpentina para aquecimento</td>
                  <td class="text-center">1</td>
                  <td class="text-right">4.500,00</td>
                </tr>
              </tbody>
            </table>
    
            <div class="total">${totalService}</div>
          </div>
        </div>
      </section>
    
      <!-- Observações -->
      <section>
        <h2>Observações</h2>
    
        <div class="card">
          <div class="card-content card-content-observation whitespace-pre-line" style="padding: 0px !important;">
            ${observation}
          </div>
        </div>
      </section>
    </main>
  `;
}

function info(label: string, value: string, borderRight = false) {
  return `
    <div class="info ${borderRight ? "border-right" : ""}">
      <span class="label">${label}:</span>
      <span>${value}</span>
    </div>
  `;
}
