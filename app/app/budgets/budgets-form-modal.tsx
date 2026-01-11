/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getClients } from "@/actions/clients/get-clients.action";
import FormModal, { Loader } from "@/components/form/FormModal";
import { InputError } from "@/components/form/InputError";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useZodFormState } from "@/hooks/use-zod-form-state";
import { ClientDTO } from "@/services/firebase/clients/dtos/clients.dto";
import { PropsUpdateForm } from "@/types/update-form";
import { formatDocument } from "@/utils/functions/string";
import { useState, useEffect } from "react";

export default function BudgetsFormModal({ id }: PropsUpdateForm) {
    const { values, errors, handleChange, setValues } = useZodFormState(clientSchema);

    const [loader, setLoader] = useState<Loader>({ state: false, message: "" });
    const [clients, setClients] = useState<ClientDTO[]>([]);

    useEffect(() => {
        async function fetchClients() {
            try {
                setLoader({ state: true, message: "Carregando clientes..." });

                const res = await getClients();

                if (res && res.data) setClients(res.data);
            } finally {
                setLoader({ state: false, message: "" });
            }
        }

        fetchClients();
    }, []);

    return (
        <FormModal title="Novo Orçamento" loader={loader} pending={false}>
            <form action="" className="col-span-12 grid grid-cols-12 gap-x-4 gap-y-3 mt-2">
                {id && <Input name="id" type="hidden" value={id} />}

                <div className='lg:col-span-4 col-span-12'>
                    <Label htmlFor="client_id">Cliente</Label>
                    <div className="mt-1">
                        <Select
                            name="client_id"
                            value={values.client_id?.toString() || "-1"}
                            onValueChange={(val) => handleChange({ target: { name: "client_id", value: val } } as any)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="SELECIONE" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="-1" disabled>SELECIONE</SelectItem>
                                {clients?.map((client, i) => {
                                    return (
                                        <SelectItem key={i} value={client.id}>{formatDocument(client.document)} - {client.corporate_name}</SelectItem>
                                    )
                                })}
                            </SelectContent>
                        </Select>
                        <InputError  text={errors.client_id} />
                    </div>
                </div>
            </form>
        </FormModal>
    )
}