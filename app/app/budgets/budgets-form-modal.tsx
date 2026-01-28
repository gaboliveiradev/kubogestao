/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getClients } from "@/actions/clients/get-clients.action";
import FormModal, { Loader } from "@/components/form/FormModal";
import { InputError } from "@/components/form/InputError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useZodFormState } from "@/hooks/use-zod-form-state";
import { budgetSchema } from "@/schemas/budgets.schema";
import { ClientDTO } from "@/services/firebase/clients/dtos/clients.dto";
import { PropsUpdateForm } from "@/types/update-form";
import { formatCurrency, formatDocument, generateBudgetCode, parseCurrency } from "@/utils/functions/string";
import { ArrowDown02Icon, FolderRemoveIcon, InputLongTextIcon, Task01Icon, UserAccountIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { useState, useEffect, useActionState } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table"
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import { handleFormFeedback, showErrorSonner } from "@/utils/sonner";
import ButtonsFooterForm from "@/components/form/ButtonsFooterForm";
import { ServiceResponse } from "@/types/service-response";
import { upsertBudget } from "@/actions/budgets/save-budget.action";
import { InputDocument } from "@/components/form/InputDocument";
import { InputPhone } from "@/components/form/InputPhone";
import { getClientById } from "@/actions/clients/get-client-by-id.action";
import { InputCEP } from "@/components/form/InputCEP";
import { RichTextEditor } from "@/components/rich-text-editor/RichTextEditor";

type TabValue = "clients" | "items" | "observations";

type BudgetItem = {
    id: string
    name: string
    quantity: number
    value: number
    description?: string
}

export default function BudgetsFormModal({ id }: PropsUpdateForm) {
    const { values, errors, handleChange, setValues } = useZodFormState(budgetSchema);
    const [state, formAction, pending] = useActionState<ServiceResponse<{ id: string }>, FormData>(upsertBudget, {
        success: null,
        message: ""
    })

    const [loader, setLoader] = useState<Loader>({ state: false, message: "" });
    const [clients, setClients] = useState<ClientDTO[]>([]);
    const [activeTab, setActiveTab] = useState<TabValue>("clients");

    const [items, setItems] = useState<BudgetItem[]>([]);
    const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
    const [itemForm, setItemForm] = useState({
        name: "",
        quantity: 1,
        value: "",
        description: "",
    });

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
                setLoader({ state: false, message: "" });
            }
        }

        fetchClients();
    }, []);

    function toggleItem(id: string) {
        setExpandedItemId(prev => (prev === id ? null : id))
    }

    function handleTabChange(value: string) {
        if (value === "clients" || value === "items" || value === "observations") {
            setActiveTab(value)
        }
    }

    function handleItemChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target
        setItemForm(prev => ({ ...prev, [name]: value }))
    }

    function handleAddItem() {
        if (!itemForm.name) {
            showErrorSonner('Campo nome item é obrigatório.');
            return;
        } else if (!itemForm.quantity) {
            showErrorSonner('Campo quantidade é obrigatório.');
            return;
        } else if (!itemForm.value) {
            showErrorSonner('Campo valor unitário é obrigatório.');
            return;
        }

        const parsedValue = parseCurrency(itemForm.value) ?? 0

        const newItem: BudgetItem = {
            id: crypto.randomUUID(),
            name: itemForm.name,
            quantity: Number(itemForm.quantity),
            value: parsedValue,
            description: itemForm.description,
        }

        setItems(prev => [...prev, newItem])

        setItemForm({
            name: "",
            quantity: 1,
            value: "",
            description: "",
        })
    }


    function handleRemoveItem(id: string) {
        setItems(prev => prev.filter(item => item.id !== id))
    }

    const totalItemsValue = items.reduce((acc, item) => {
        return acc + item.quantity * item.value
    }, 0)

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

                <div className='lg:col-span-3 col-span-12'>
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

                <div className='lg:col-span-9 col-span-12'>
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

                <div className="lg:col-span-12 col-span-12 w-full py-2">
                    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full mb-6">
                        <div className="w-full border">
                            <TabsList className="inline-flex px-0 bg-transparent">
                                <TabsTrigger value="clients">
                                    <HugeiconsIcon icon={UserAccountIcon} />
                                    Dados do Cliente
                                </TabsTrigger>
                                <TabsTrigger value="items">
                                    <HugeiconsIcon icon={InputLongTextIcon} />
                                    Items do Orçamento
                                </TabsTrigger>
                                <TabsTrigger value="observations">
                                    <HugeiconsIcon icon={Task01Icon} />
                                    Observações
                                </TabsTrigger>
                            </TabsList>
                        </div>
                    </Tabs>

                    <div className={activeTab !== "clients" ? "hidden" : ""}>
                        <div className="grid grid-cols-12 gap-4 mb-4">
                            <div className='lg:col-span-4 col-span-12'>
                                <Label htmlFor="client_document">CNPJ/CPF *</Label>
                                <div className="mt-1">
                                    <InputDocument
                                        name="client_document"
                                        value={values.client_document || ""}
                                        onChange={handleChange}
                                    />
                                    <InputError text={errors.client_document} />
                                </div>
                            </div>
                            <div className='lg:col-span-8 col-span-12'>
                                <Label htmlFor="client_name">Razão Social *</Label>
                                <div className="mt-1">
                                    <Input
                                        name="client_name"
                                        type='text'
                                        value={values.client_name || ""}
                                        onChange={handleChange}
                                    />
                                    <InputError text={errors.client_name} />
                                </div>
                            </div>
                            <div className='lg:col-span-3 col-span-12'>
                                <Label htmlFor="responsible_client_name">Nome Responsável</Label>
                                <div className="mt-1">
                                    <Input
                                        name="responsible_client_name"
                                        type='text'
                                        value={values.responsible_client_name || ""}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className='lg:col-span-5 col-span-12'>
                                <Label htmlFor="budget_email">E-mail Orçamento</Label>
                                <div className="mt-1">
                                    <Input
                                        name="budget_email"
                                        type='email'
                                        value={values.budget_email || ""}
                                        onChange={handleChange}
                                    />
                                    <InputError text={errors.budget_email} />
                                </div>
                            </div>

                            <div className='lg:col-span-4 col-span-12'>
                                <Label htmlFor="budget_phone">Telefone Orçamento</Label>
                                <div className="mt-1">
                                    <InputPhone
                                        name="budget_phone"
                                        value={values.budget_phone || ""}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>


                            <div className="lg:col-span-3 col-span-12">
                                <Label htmlFor="client_zipcode">CEP *</Label>
                                <div className="mt-1">
                                    <InputCEP
                                        name="client_zipcode"
                                        value={values.client_zipcode || ""}
                                        placeholder="Informe o CEP"
                                        onChange={handleChange}
                                    />
                                    <InputError text={errors.client_zipcode} />
                                </div>
                            </div>
                            <div className='lg:col-span-9 col-span-12'>
                                <Label htmlFor="client_address">Logradouro *</Label>
                                <div className="mt-1">
                                    <Input
                                        name="client_address"
                                        type='text'
                                        value={values.client_address || ""}
                                        onChange={handleChange}
                                    />
                                    <InputError text={errors.client_address} />
                                </div>
                            </div>
                            <div className='lg:col-span-2 col-span-12'>
                                <Label htmlFor="client_number">Número</Label>
                                <div className="mt-1">
                                    <Input
                                        name="client_number"
                                        type='text'
                                        value={values.client_number || ""}
                                        onChange={handleChange}
                                    />
                                    <InputError text={errors.client_number} />
                                </div>
                            </div>
                            <div className='lg:col-span-7 col-span-12'>
                                <Label htmlFor="client_city">Cidade *</Label>
                                <div className="mt-1">
                                    <Input
                                        name="client_city"
                                        type='text'
                                        value={values.client_city || ""}
                                        onChange={handleChange}
                                    />
                                    <InputError text={errors.client_city} />
                                </div>
                            </div>
                            <div className='lg:col-span-3 col-span-12'>
                                <Label htmlFor="client_state">Estado *</Label>
                                <div className="mt-1">
                                    <Input
                                        name="client_state"
                                        type='text'
                                        value={values.client_state || ""}
                                        onChange={handleChange}
                                    />
                                    <InputError text={errors.client_state} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={activeTab !== "items" ? "hidden" : ""}>
                        <div className="grid grid-cols-12 gap-4 mb-4">
                            <div className="col-span-12 lg:col-span-7">
                                <Label>Nome</Label>
                                <Input
                                    name="name"
                                    value={itemForm.name}
                                    onChange={handleItemChange}
                                />
                            </div>

                            <div className="col-span-6 lg:col-span-1">
                                <Label>Qtd</Label>
                                <Input
                                    name="quantity"
                                    type="number"
                                    min={1}
                                    value={itemForm.quantity}
                                    onChange={handleItemChange}
                                />
                            </div>

                            <div className="col-span-6 lg:col-span-2">
                                <Label>Valor Unitário (R$)</Label>
                                <Input
                                    name="value"
                                    inputMode="numeric"
                                    value={itemForm.value}
                                    onChange={(e) => {
                                        const rawValue = e.target.value
                                        setItemForm(prev => ({
                                            ...prev,
                                            value: formatCurrency(rawValue),
                                        }))
                                    }}
                                />

                            </div>

                            <div className="col-span-12 lg:col-span-2 flex items-end">
                                <Button
                                    type="button"
                                    className="w-full cursor-pointer"
                                    onClick={handleAddItem}
                                >
                                    <HugeiconsIcon icon={ArrowDown02Icon} />
                                </Button>
                            </div>

                            <div className="col-span-12">
                                <Textarea
                                    name="description"
                                    placeholder="Descrição do item (opcional)"
                                    value={itemForm.description}
                                    onChange={handleItemChange}
                                />
                            </div>
                        </div>

                        <Table className="border">
                            <TableHeader className="sticky top-0 bg-background z-10">
                                <TableRow>
                                    <TableHead>Item</TableHead>
                                    <TableHead className="text-right">Qtd</TableHead>
                                    <TableHead className="text-right">Valor Unit (R$)</TableHead>
                                    <TableHead className="text-right">Total (R$)</TableHead>
                                    <TableHead />
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {items.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5}>
                                            <div>
                                                <Empty>
                                                    <EmptyHeader>
                                                        <EmptyMedia variant="icon">
                                                            <HugeiconsIcon icon={FolderRemoveIcon} />
                                                        </EmptyMedia>
                                                        <EmptyTitle>Nenhum Item Vinculado</EmptyTitle>
                                                        <EmptyDescription>
                                                            No momento não há itens para serem exibidos.
                                                        </EmptyDescription>
                                                    </EmptyHeader>
                                                </Empty>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}

                                {items.map((item) => {
                                    const isExpanded = expandedItemId === item.id

                                    return (
                                        <React.Fragment key={item.id}>
                                            <tr
                                                className="border-t cursor-pointer hover:bg-muted/50"
                                                onClick={() => toggleItem(item.id)}
                                            >
                                                <td className="p-2">{item.name}</td>
                                                <td className="p-2 text-right">{item.quantity}</td>
                                                <td className="p-2 text-right">
                                                    {formatCurrency(item.value)}
                                                </td>
                                                <td className="p-2 text-right font-medium">
                                                    {formatCurrency(item.quantity * item.value)}
                                                </td>
                                                <td
                                                    className="p-2 text-right"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleRemoveItem(item.id)}
                                                    >
                                                        Remover
                                                    </Button>
                                                </td>
                                            </tr>

                                            {isExpanded && (
                                                <tr className="bg-muted/30">
                                                    <td colSpan={5} className="p-4 text-sm text-muted-foreground">
                                                        {item.description || "Nenhuma descrição informada."}
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    )
                                })}
                            </TableBody>
                        </Table>

                    </div>

                    <div className={activeTab !== "observations" ? "hidden" : ""}>
                        <div className="col-span-12 grid grid-cols-12 gap-x-4 gap-y-3 mt-2">
                            <div className='lg:col-span-12 col-span-12'>
                                <RichTextEditor
                                    value={values.observations}
                                    onChange={(html: any) => handleChange({ target: { name: "observations", value: html } } as any)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 mt-4">
                        <div className="col-span-12">
                            <div className="w-full border rounded-md p-4 bg-muted/30">
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>Total de Itens</span>
                                    <span>{items.length}</span>
                                </div>

                                <div className="flex justify-between mt-2 text-base font-semibold">
                                    <span>Total Geral</span>
                                    <span>{formatCurrency(totalItemsValue)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ButtonsFooterForm />
            </form>
        </FormModal>
    )
}