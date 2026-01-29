/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import ButtonsFooterForm from "@/components/form/ButtonsFooterForm";
import FormModal, { Loader } from "@/components/form/FormModal";
import { InputError } from "@/components/form/InputError";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useZodFormState } from "@/hooks/use-zod-form-state";
import { useActionState, useEffect, useState } from "react";
import { PropsUpdateForm } from "@/types/update-form";
import { clientSchema } from "@/schemas/clients.schema";
import { ServiceResponse } from "@/types/service-response";
import { upsertClient } from "@/actions/clients/save-clients.action";
import { handleFormFeedback, showErrorSonner } from "@/utils/sonner";
import { InputDocument } from "@/components/form/InputDocument";
import { getClientById } from "@/actions/clients/get-client-by-id.action";
import ClientTabs from "./components/ClientTabs";
import { getCompanyDataByCNPJ } from "@/actions/cnpj/get-company-data-by-cnpj.action";

export default function ClientFormModal({ id }: PropsUpdateForm) {
    const { values, errors, handleChange, setValues } = useZodFormState(clientSchema);
    const [state, formAction, pending] = useActionState<ServiceResponse<{ id: string }>, FormData>(upsertClient, {
        success: null,
        message: "",
    });

    const [loader, setLoader] = useState<Loader>({ state: false, message: "" });

    useEffect(() => {
        handleFormFeedback({ state })

        console.log(state);
    }, [state]);

    useEffect(() => {
        if (!id) return;

        async function loadClient(clientId: string) {
            setLoader({ state: true, message: "Carregando cliente..." });

            const response = await getClientById(clientId);

            if (!response.success || !response.data) {
                showErrorSonner(response.message);
                setLoader({ state: false, message: "" });
                return;
            }

            setValues(response.data);
            setLoader({ state: false, message: "" });
        }

        loadClient(id);
    }, [id]);

    async function handleCNPJBlur(e: React.FocusEvent<HTMLInputElement>) {
        const cnpj = e.target.value;

        if (!cnpj) return;

        setLoader({ state: true, message: "Buscando dados do CNPJ..." });

        try {
            const result = await getCompanyDataByCNPJ(cnpj);

            if (!result.success) {
                showErrorSonner(result.message);
                return;
            }

            setValues((prev) => ({
                ...prev,
                ...result.data,
            }));
        } finally {
            setLoader({ state: false, message: "" });
        }
    }

    return (
        <FormModal title="Novo Cliente" loader={loader} pending={pending}>
            <form action={formAction} className="col-span-12 grid grid-cols-12 gap-x-4 gap-y-3 mt-2">
                {id && <Input name="id" type="hidden" value={id} />}

                <div className='lg:col-span-3 col-span-12'>
                    <Label htmlFor="document">CNPJ/CPF *</Label>
                    <div className="mt-1">
                        <InputDocument
                            name="document"
                            value={values.document || ""}
                            onChange={handleChange}
                            onBlur={(e) => handleCNPJBlur(e)}
                        />
                        <InputError text={errors.document} />
                    </div>
                </div>
                <div className='lg:col-span-5 col-span-12'>
                    <Label htmlFor="corporate_name">Razão Social *</Label>
                    <div className="mt-1">
                        <Input
                            name="corporate_name"
                            type='text'
                            value={values.corporate_name || ""}
                            onChange={handleChange}
                        />
                        <InputError text={errors.corporate_name} />
                    </div>
                </div>
                <div className='lg:col-span-4 col-span-12'>
                    <Label htmlFor="fantasy_name">Nome Fantasia</Label>
                    <div className="mt-1">
                        <Input
                            name="fantasy_name"
                            type='text'
                            value={values.fantasy_name || ""}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='lg:col-span-5 col-span-12'>
                    <Label htmlFor="company_nickname">Apelido</Label>
                    <div className="mt-1">
                        <Input
                            name="company_nickname"
                            type='text'
                            value={values.company_nickname || ""}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='lg:col-span-4 col-span-12'>
                    <Label htmlFor="responsible_name">Nome Responsável</Label>
                    <div className="mt-1">
                        <Input
                            name="responsible_name"
                            type='text'
                            value={values.responsible_name || ""}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='lg:col-span-3 col-span-12'>
                    <Label htmlFor="budget_key">Chave de Orçamento *</Label>
                    <div className="mt-1">
                        <Input
                            name="budget_key"
                            type='text'
                            value={values.budget_key || ""}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <ClientTabs
                    values={values}
                    errors={errors}
                    handleChange={handleChange}
                    setValues={setValues}
                    setLoader={setLoader}
                />

                <ButtonsFooterForm />
            </form>
        </FormModal >
    )
}