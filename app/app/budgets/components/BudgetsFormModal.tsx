/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getClients } from "@/actions/clients/get-clients.action";
import FormModal, { Loader } from "@/components/form/FormModal";
import { InputError } from "@/components/form/InputError";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useZodFormState } from "@/hooks/use-zod-form-state";
import { budgetSchema } from "@/schemas/budgets.schema";
import { ClientDTO } from "@/services/firebase/clients/dtos/clients.dto";
import { PropsUpdateForm } from "@/types/update-form";
import { formatDocument, generateBudgetCode } from "@/utils/functions/string";
import React, { useState, useEffect, useActionState } from "react";
import { handleFormFeedback, showErrorSonner } from "@/utils/sonner";
import ButtonsFooterForm from "@/components/form/ButtonsFooterForm";
import { ServiceResponse } from "@/types/service-response";
import { upsertBudget } from "@/actions/budgets/save-budget.action";
import { getClientById } from "@/actions/clients/get-client-by-id.action";
import { getBudgetById } from "@/actions/budgets/get-budget-by-id.action";
import { getItemsByBudgetId } from "@/actions/budgets-items/get-items-by-budget-id";
import { useBudgetItems } from "@/hooks/use-budget-item";
import BudgetTabs from "./BudgetTabs";

export default function BudgetsFormModal({ id }: PropsUpdateForm) {
    const { values, errors, handleChange, setValues } = useZodFormState(budgetSchema);
    const [state, formAction, pending] = useActionState<ServiceResponse<{ id: string }>, FormData>(upsertBudget, {
        success: null,
        message: ""
    });

    const {
        items,
        setItems,
        handleAddItem,
        handleRemoveItem,
        toggleItem,
        expandedItemId,
        total,
    } = useBudgetItems();

    const [loader, setLoader] = useState<Loader>({ state: false, message: "" });
    const [clients, setClients] = useState<ClientDTO[]>([]);

    useEffect(() => {
        handleFormFeedback({ state })
    }, [state]);

    useEffect(() => {
        async function fetchClients() {
            try {
                setLoader({ state: true, message: "Carregando clientes..." });

                const res = await getClients();

                if (res && res.data) setClients(res.data);
            } finally {
                if (!id) setLoader({ state: false, message: "" });
            }
        }

        fetchClients();
    }, [id]);

    useEffect(() => {
        if (!id) return;

        async function loadBudget(budgetId: string) {
            try {
                // 1. Carregar dados do orçamento
                setLoader({ state: true, message: "Carregando dados do orçamento..." });

                const resBudget = await getBudgetById(budgetId);

                if (!resBudget.success || !resBudget.data) {
                    showErrorSonner(resBudget.message);
                    setLoader({ state: false, message: "" });
                    return;
                }

                setValues(resBudget.data);

                // 2. Carregar itens do orçamento
                setLoader({ state: true, message: "Carregando itens do orçamento..." });

                const resBudgetItems = await getItemsByBudgetId(budgetId);

                if (!resBudgetItems.success || !resBudgetItems.data) {
                    showErrorSonner(resBudgetItems.message);
                    setLoader({ state: false, message: "" });
                    return;
                }

                setItems(resBudgetItems.data);
            } finally {
                setLoader({ state: false, message: "" });
            }
        }

        loadBudget(id);
    }, [id, setValues]);

    function handleSubmit(formData: FormData) {
        if (items.length === 0) {
            showErrorSonner("Adicione pelo menos um item ao orçamento.");
            return;
        }

        formData.append("items", JSON.stringify(items));
        formData.append("observations", values.observations || "");

        formAction(formData);
    }

    async function handleChangeClient(clientId: string) {
        setLoader({ state: true, message: "Buscando cliente..." });

        handleChange({ target: { name: "client_id", value: clientId } } as any);

        // busca o client pelo id
        const client = await getClientById(clientId);

        if (!client.success || !client.data) {
            showErrorSonner(client.message);
            setLoader({ state: false, message: "" });
            return;
        }

        const budgetcode = generateBudgetCode(client?.data?.budget_key || 'ORC');

        setValues((prev) => ({
            ...prev,
            client_document: client?.data?.document,
            client_name: client?.data?.corporate_name,
            responsible_client_name: client?.data?.responsible_name,
            budget_email: client?.data?.customer_email,
            budget_phone: client?.data?.responsible_phone,
            budget_key: budgetcode,
            client_zipcode: client?.data?.zipcode,
            client_address: client?.data?.address,
            client_number: client?.data?.number,
            client_city: client?.data?.city,
            client_state: client?.data?.state,
        }));

        setLoader({ state: false, message: "" });
    }

    return (
        <FormModal title="Novo Orçamento" loader={loader} pending={pending}>
            <form action={handleSubmit} className="col-span-12 grid grid-cols-12 gap-x-4 gap-y-3 mt-2">
                {id && <Input name="id" type="hidden" value={id} />}

                <div className='lg:col-span-3 col-span-12 space-y-2'>
                    <Label htmlFor="budget_key">Código Orçamento *</Label>
                    <div className="mt-1">
                        <Input
                            name="budget_key"
                            type='text'
                            value={values.budget_key || ""}
                            onChange={handleChange}
                            readOnly={true}
                        />
                        <InputError text={errors.budget_key} />
                    </div>
                </div>

                <div className='lg:col-span-9 col-span-12 space-y-2'>
                    <Label htmlFor="client_id">Cliente *</Label>
                    <div className="mt-1">
                        <Select
                            name="client_id"
                            value={values.client_id?.toString() || "-1"}
                            onValueChange={(val) => handleChangeClient(val)}
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
                        <InputError text={errors.client_id} />
                    </div>
                </div>

                <BudgetTabs
                    values={values}
                    handleChange={handleChange}
                    errors={errors}
                    items={items}
                    handleAddItem={handleAddItem}
                    handleRemoveItem={handleRemoveItem}
                    toggleItem={toggleItem}
                    expandedItemId={expandedItemId}
                    total={total}
                />

                <ButtonsFooterForm />
            </form>
        </FormModal>
    )
}