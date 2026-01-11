'use client';

import { ClientColumnsDesktop } from "./columns";
import ClientFormModal from "./clients-form-modal";
import { DataTable } from "@/components/table/DataTable";
import { ClientDTO } from "@/services/firebase/clients/dtos/clients.dto";

interface Props {
  data: ClientDTO[];
}

export default function ClientList({ data }: Props) {
  return <DataTable columns={ClientColumnsDesktop} data={data} fieldFilter="corporate_name" FormEdit={ClientFormModal} size="lg" />;
}
