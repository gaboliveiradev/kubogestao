/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import ButtonsFooterForm from "@/components/form/ButtonsFooterForm";
import FormModal, { Loader } from "@/components/form/FormModal";
import { InputError } from "@/components/form/InputError";
import { FieldLoader } from "@/components/form/FieldLoader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useZodFormState } from "@/hooks/use-zod-form-state";
import { FormEvent, useActionState, useEffect, useState } from "react";
import { PropsUpdateForm } from "@/types/update-form";
import { clientSchema } from "@/schemas/clients.schema";
import { ServiceResponse } from "@/types/service-response";
import { upsertClient } from "@/actions/clients/save-clients.action";
import { handleFormFeedback, showErrorSonner } from "@/utils/sonner";
import { InputDocument } from "@/components/form/InputDocument";
import { getClientById } from "@/actions/clients/get-client-by-id.action";
import ClientTabs from "./components/ClientTabs";
import { getCompanyDataByCNPJ } from "@/actions/cnpj/get-company-data-by-cnpj.action";
import { getAddressByCEP } from "@/actions/cep/get-address-by-cep.action";

export type Lookup = "cnpj" | "cep" | null;

// campos opcionais que a consulta só preenche se o usuário ainda não digitou nada
const FILL_ONLY_IF_EMPTY = ["responsible_name", "customer_email", "customer_phone"];

type LookupResult = {
    success: boolean;
    message?: string;
    data: Record<string, string | undefined>;
};

export default function ClientFormModal({ id }: PropsUpdateForm) {
    const { values, errors, handleChange, setValues, validateAll, clearErrors } = useZodFormState(clientSchema);
    const [state, formAction, pending] = useActionState<ServiceResponse<{ id: string }>, FormData>(upsertClient, {
        success: null,
        message: "",
    });

    const [loader, setLoader] = useState<Loader>({ state: false, message: "" });
    const [lookup, setLookup] = useState<Lookup>(null);
    const [submitAttempt, setSubmitAttempt] = useState(0);

    useEffect(() => {
        handleFormFeedback({ state })
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

    async function runLookup(kind: Exclude<Lookup, null>, fetcher: () => Promise<LookupResult>) {
        setLookup(kind);

        try {
            const result = await fetcher();

            if (!result.success) {
                showErrorSonner(result.message);
                return;
            }

            const filled = Object.fromEntries(
                Object.entries(result.data).filter(([, v]) => v !== undefined && v !== null && v !== "")
            );

            setValues((prev) => {
                const next = { ...prev };
                for (const [key, value] of Object.entries(filled)) {
                    if (FILL_ONLY_IF_EMPTY.includes(key) && prev[key]) continue;
                    next[key] = value;
                }
                return next;
            });
            clearErrors(Object.keys(filled));
        } finally {
            setLookup(null);
        }
    }

    function handleCNPJBlur(e: React.FocusEvent<HTMLInputElement>) {
        const cnpj = e.target.value;

        // só consulta quando é um CNPJ completo (CPF não tem consulta)
        if (cnpj.replace(/\D/g, "").length !== 14) return;

        runLookup("cnpj", () => getCompanyDataByCNPJ(cnpj));
    }

    function handleCEPBlur(e: React.FocusEvent<HTMLInputElement>) {
        const cep = e.target.value;

        if (cep.replace(/\D/g, "").length !== 8) return;

        runLookup("cep", () => getAddressByCEP(cep));
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        const { valid, errors: validationErrors } = validateAll();

        if (!valid) {
            e.preventDefault();
            setSubmitAttempt((n) => n + 1);
            // evita falha silenciosa quando o erro está em campo/aba não visível
            showErrorSonner(Object.values(validationErrors)[0] || "Verifique os campos do formulário.");
        }
    }

    const cnpjLoading = lookup === "cnpj";

    return (
        <FormModal
            title={id ? "Editar Cliente" : "Novo Cliente"}
            description="Informe os dados principais do cliente. Endereço e contato ficam nas abas abaixo."
            loader={loader}
            pending={pending}
        >
            <form action={formAction} onSubmit={handleSubmit} noValidate className="col-span-12 grid grid-cols-12 gap-x-4 gap-y-3 mt-2">
                {id && <Input name="id" type="hidden" value={id} />}

                <div className="col-span-12 grid grid-cols-12 gap-4 rounded-xl border bg-muted/30 p-4">
                <div className='lg:col-span-3 col-span-12 space-y-2'>
                    <Label htmlFor="document">CNPJ/CPF *</Label>
                    <div className="mt-1">
                        <FieldLoader loading={cnpjLoading} variant="spinner">
                            <InputDocument
                                name="document"
                                value={values.document || ""}
                                onChange={handleChange}
                                onBlur={handleCNPJBlur}
                                invalid={!!errors.document}
                            />
                        </FieldLoader>
                        <InputError text={errors.document} />
                    </div>
                </div>
                <div className='lg:col-span-5 col-span-12 space-y-2'>
                    <Label htmlFor="corporate_name">Razão Social *</Label>
                    <div className="mt-1">
                        <FieldLoader loading={cnpjLoading}>
                            <Input
                                name="corporate_name"
                                type='text'
                                value={values.corporate_name || ""}
                                onChange={handleChange}
                                aria-invalid={!!errors.corporate_name}
                            />
                        </FieldLoader>
                        <InputError text={errors.corporate_name} />
                    </div>
                </div>
                <div className='lg:col-span-4 col-span-12 space-y-2'>
                    <Label htmlFor="fantasy_name">Nome Fantasia</Label>
                    <div className="mt-1">
                        <FieldLoader loading={cnpjLoading}>
                            <Input
                                name="fantasy_name"
                                type='text'
                                value={values.fantasy_name || ""}
                                onChange={handleChange}
                            />
                        </FieldLoader>
                    </div>
                </div>
                <div className='lg:col-span-5 col-span-12 space-y-2'>
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
                <div className='lg:col-span-4 col-span-12 space-y-2'>
                    <Label htmlFor="responsible_name">Nome Responsável</Label>
                    <div className="mt-1">
                        <FieldLoader loading={cnpjLoading}>
                            <Input
                                name="responsible_name"
                                type='text'
                                value={values.responsible_name || ""}
                                onChange={handleChange}
                            />
                        </FieldLoader>
                    </div>
                </div>
                <div className='lg:col-span-3 col-span-12 space-y-2'>
                    <Label htmlFor="budget_key">Chave de Orçamento *</Label>
                    <div className="mt-1">
                        <Input
                            name="budget_key"
                            type='text'
                            value={values.budget_key || ""}
                            onChange={handleChange}
                            aria-invalid={!!errors.budget_key}
                        />
                        <InputError text={errors.budget_key} />
                    </div>
                </div>

                </div>

                <ClientTabs
                    values={values}
                    errors={errors}
                    handleChange={handleChange}
                    lookup={lookup}
                    onCepBlur={handleCEPBlur}
                    submitAttempt={submitAttempt}
                />

                <ButtonsFooterForm />
            </form>
        </FormModal >
    )
}
