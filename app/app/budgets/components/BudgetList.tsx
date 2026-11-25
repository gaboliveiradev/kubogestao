'use client';

import { useMemo, useState } from "react";
import { DataTable } from "@/components/table/DataTable";
import { Button } from "@/components/ui/button";
import { BudgetDTO } from "@/services/firebase/budgets/dtos/budgets.dto";
import { ClientDTO } from "@/services/firebase/clients/dtos/clients.dto";
import { BudgetsColumnsDesktop } from "../colums";
import BudgetsFormModal from "./BudgetsFormModal";
import ClientCombobox from "./ClientCombobox";

interface Props {
  data: BudgetDTO[];
  clients: ClientDTO[];
}

export default function BudgetList({ data, clients }: Props) {
  const [clientId, setClientId] = useState<string | undefined>();

  const filteredData = useMemo(
    () => (clientId ? data.filter((budget) => budget.client_id === clientId) : data),
    [data, clientId],
  );

  const clientFilter = (
    <>
      <div className="w-full max-w-sm">
        <ClientCombobox clients={clients} value={clientId} onSelect={setClientId} />
      </div>
      {clientId && (
        <Button variant="outline" size="sm" onClick={() => setClientId(undefined)}>
          Limpar
        </Button>
      )}
    </>
  );

  return (
    <DataTable
      columns={BudgetsColumnsDesktop}
      data={filteredData}
      fieldFilter="client_name"
      extraFilters={clientFilter}
      FormEdit={BudgetsFormModal}
      size="lg"
    />
  );
}
