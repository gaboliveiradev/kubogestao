import Header from "@/components/common/Header";
import ClientFormModal from "./clients-form-modal";
import ClientList from "./clients-list";
import { getClients } from "@/actions/clients/get-clients.action";
import { Suspense } from "react";
import Loader from "@/components/common/loader/Loader";

function ClientListWrapper() {
    const clientsPromise = getClients();
    return clientsPromise.then(clients => <ClientList data={clients.data} />);
}

export default function ClientsPage() {
    return (
        <>
            <Header title="Clientes" pathList="/app/clients" formComponent={<ClientFormModal />} size="lg" />
            <Suspense fallback={<Loader />}>
                <ClientListWrapper />
            </Suspense>
        </>
    )
}