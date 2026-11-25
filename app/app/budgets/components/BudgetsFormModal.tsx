/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getClients } from "@/actions/clients/get-clients.action";
import FormModal, { Loader } from "@/components/form/FormModal";
import { InputError } from "@/components/form/InputError";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useZodFormState } from "@/hooks/use-zod-form-state";
import { budgetSchema } from "@/schemas/budgets.schema";
import { ClientDTO } from "@/services/firebase/clients/dtos/clients.dto";
import { PropsUpdateForm } from "@/types/update-form";
import { generateBudgetCode } from "@/utils/functions/string";
import React, { useState, useEffect, useActionState, useRef } from "react";
import { handleFormFeedback, showErrorSonner } from "@/utils/sonner";
import ButtonsFooterForm from "@/components/form/ButtonsFooterForm";
import { ServiceResponse } from "@/types/service-response";
import { upsertBudget } from "@/actions/budgets/save-budget.action";
import { getClientById } from "@/actions/clients/get-client-by-id.action";
import { getBudgetById } from "@/actions/budgets/get-budget-by-id.action";
import { getItemsByBudgetId } from "@/actions/budgets-items/get-items-by-budget-id";
import { useBudgetItems } from "@/hooks/use-budget-item";
import BudgetTabs from "./BudgetTabs";
import ClientCombobox from "./ClientCombobox";
import { getUserSettings } from "@/actions/settings/get-user-settings.action";
import { BudgetSettings } from "@/types/user-settings";
import { resolveBudgetPlaceholders } from "@/utils/functions/budget-placeholders";
import { HugeiconsIcon } from "@hugeicons/react";
import { Invoice01Icon, UserSearch01Icon } from "@hugeicons/core-free-icons";

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
        handleUpdateItem,
        handleRemoveItem,
        toggleItem,
        expandedItemId,
        total,
    } = useBudgetItems();

    const [loader, setLoader] = useState<Loader>({ state: false, message: "" });
    const [clients, setClients] = useState<ClientDTO[]>([]);
    const [budgetSettings, setBudgetSettings] = useState<BudgetSettings | null>(null);
    const autoAppliedRef = useRef(false);

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
        getUserSettings().then((res) => {
            if (res.success) setBudgetSettings(res.data.budget);
        });
    }, []);

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

    // Gera a observação a partir do modelo salvo nas configurações, com os valores atuais do orçamento
    function applyDefaultObservation() {
        if (!budgetSettings?.default_observation) return;

        const html = resolveBudgetPlaceholders(budgetSettings.default_observation, {
            total: total ?? 0,
            settings: budgetSettings,
            clientName: values.client_name,
            budgetKey: values.budget_key,
        });

        handleChange({ target: { name: "observations", value: html } } as any);
    }

    // Novo orçamento: ao abrir a aba de observações pela primeira vez, aplica o modelo se estiver vazia
    function handleObservationsOpen() {
        if (id || autoAppliedRef.current || !budgetSettings?.auto_apply_observation) return;

        autoAppliedRef.current = true;
        if (!values.observations) applyDefaultObservation();
    }

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
        <FormModal
            title={id ? "Editar Orçamento" : "Novo Orçamento"}
            description="Selecione o cliente, adicione os itens e finalize o orçamento."
            loader={loader}
            pending={pending}
        >
            <form action={handleSubmit} className="col-span-12 grid grid-cols-12 gap-x-4 gap-y-3 mt-2">
                {id && <Input name="id" type="hidden" value={id} />}
                <input type="hidden" name="client_id" value={values.client_id?.toString() || ""} />
                <input type="hidden" name="budget_key" value={values.budget_key || ""} />

                <div className="col-span-12 grid grid-cols-12 gap-4 rounded-xl border bg-muted/30 p-4">
                    <div className="lg:col-span-8 col-span-12 space-y-2">
                        <Label className="flex items-center gap-1.5 text-muted-foreground">
                            <HugeiconsIcon icon={UserSearch01Icon} className="size-4" />
                            Cliente *
                        </Label>
                        <ClientCombobox
                            clients={clients}
                            value={values.client_id?.toString()}
                            onSelect={handleChangeClient}
                            invalid={!!errors.client_id}
                        />
                        <InputError text={errors.client_id} />
                    </div>

                    <div className="lg:col-span-4 col-span-12 space-y-2">
                        <Label className="flex items-center gap-1.5 text-muted-foreground">
                            <HugeiconsIcon icon={Invoice01Icon} className="size-4" />
                            Código do Orçamento *
                        </Label>
                        <div className="flex h-11 items-center rounded-lg border border-dashed bg-background px-3 font-mono text-sm font-semibold tracking-wide">
                            {values.budget_key || <span className="font-sans font-normal text-muted-foreground">Gerado ao selecionar o cliente</span>}
                        </div>
                        <InputError text={errors.budget_key} />
                    </div>
                </div>

                <BudgetTabs
                    values={values}
                    handleChange={handleChange}
                    errors={errors}
                    items={items}
                    handleAddItem={handleAddItem}
                    handleUpdateItem={handleUpdateItem}
                    handleRemoveItem={handleRemoveItem}
                    toggleItem={toggleItem}
                    expandedItemId={expandedItemId}
                    total={total}
                    hasDefaultObservation={!!budgetSettings?.default_observation}
                    onApplyDefaultObservation={applyDefaultObservation}
                    onObservationsOpen={handleObservationsOpen}
                />

                <ButtonsFooterForm />
            </form>
        </FormModal>
    )
}