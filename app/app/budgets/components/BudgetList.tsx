'use client';

import { DataTable } from "@/components/table/DataTable";
import { BudgetDTO } from "@/services/firebase/budgets/dtos/budgets.dto";
import { BudgetsColumnsDesktop } from "../colums";
import BudgetsFormModal from "./BudgetsFormModal";

interface Props {
  data: BudgetDTO[];
}

export default function BudgetList({ data }: Props) {
  return <DataTable columns={BudgetsColumnsDesktop} data={data} fieldFilter="client_name" FormEdit={BudgetsFormModal} size="lg" />;
}
