"use client";

import ButtonsFooterForm from "@/components/form/ButtonsFooterForm";
import FormModal, { Loader } from "@/components/form/FormModal";
import { InputPhone } from "@/components/form/InputPhone";
import { InputError } from "@/components/form/InputError";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useZodFormState } from "@/hooks/use-zod-form-state";
import { useActionState, useEffect, useState } from "react";
import { PropsUpdateForm } from "@/types/update-form";
import { clientSchema } from "@/schemas/clients.schema";
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { HugeiconsIcon } from "@hugeicons/react";
import { AttachmentIcon, Contact01Icon, MapsLocation01Icon } from "@hugeicons/core-free-icons";
import { getAddressByCep } from "@/services/cep.service";
import { InputCEP } from "@/components/form/InputCEP";
import { ServiceResponse } from "@/types/service-response";
import { upsertClient } from "@/actions/clients/save-clients.action";
import { handleFormFeedback, showErrorSonner } from "@/utils/sonner";
import { InputDocument } from "@/components/form/InputDocument";
import { getClientById } from "@/actions/clients/get-client-by-id.action";

type TabValue = "address" | "contact" | "docs"

export default function ClientFormModal({ id }: PropsUpdateForm) {
    const { values, errors, handleChange, setValues } = useZodFormState(clientSchema);
    const [state, formAction, pending] = useActionState<ServiceResponse<{ id: string }>, FormData>(upsertClient, {
        success: null,
        message: "",
    });

    const [loader, setLoader] = useState<Loader>({ state: false, message: "" });
    const [activeTab, setActiveTab] = useState<TabValue>("address")

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
    }, [id, setValues]);

    function handleTabChange(value: string) {
        if (value === "address" || value === "contact" || value === "docs") {
            setActiveTab(value)
        }
    }

    async function handleCEPBlur(e: React.FocusEvent<HTMLInputElement>) {
        try {
            const cep = e.target.value;

            if (!cep) return;

            setLoader({ state: true, message: "Buscando endereço..." });

            const address = await getAddressByCep(cep);

            if (!address.success) {
                showErrorSonner(address.message);
                return;
            };

            setValues((prev) => ({
                ...prev,
                zipcode: address?.data?.cep,
                address: address?.data?.logradouro,
                neighborhood: address?.data?.bairro,
                city: address?.data?.localidade,
                state: address?.data?.uf,
            }));
        } finally {
            setTimeout(() => {
                setLoader({ state: false, message: "" });
            }, 500);
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

                <div className="lg:col-span-12 col-span-12 w-full py-2">
                    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full mb-6">
                        <div className="w-full border">
                            <TabsList className="inline-flex px-0 bg-transparent">
                                <TabsTrigger value="address">
                                    <HugeiconsIcon icon={MapsLocation01Icon} />
                                    Dados de Endereço
                                </TabsTrigger>
                                <TabsTrigger value="contact">
                                    <HugeiconsIcon icon={Contact01Icon} />
                                    Informações de Contato
                                </TabsTrigger>
                                <TabsTrigger value="docs">
                                    <HugeiconsIcon icon={AttachmentIcon} />
                                    Documentos
                                </TabsTrigger>
                            </TabsList>
                        </div>
                    </Tabs>

                    <div className={activeTab !== "address" ? "hidden" : ""}>
                        <div className="col-span-12 grid grid-cols-12 gap-x-4 gap-y-3 mt-2">

                            <div className="lg:col-span-3 col-span-12">
                                <Label htmlFor="zipcode">CEP *</Label>
                                <div className="mt-1">
                                    <InputCEP
                                        name="zipcode"
                                        value={values.zipcode || ""}
                                        placeholder="Informe o CEP"
                                        onChange={handleChange}
                                        onBlur={(e) => handleCEPBlur(e)}
                                    />
                                    <InputError text={errors.zipcode} />
                                </div>
                            </div>
                            <div className='lg:col-span-7 col-span-12'>
                                <Label htmlFor="address">Logradouro *</Label>
                                <div className="mt-1">
                                    <Input
                                        name="address"
                                        type='text'
                                        value={values.address || ""}
                                        onChange={handleChange}
                                    />
                                    <InputError text={errors.address} />
                                </div>
                            </div>
                            <div className='lg:col-span-2 col-span-12'>
                                <Label htmlFor="number">Número *</Label>
                                <div className="mt-1">
                                    <Input
                                        name="number"
                                        type='text'
                                        value={values.number || ""}
                                        onChange={handleChange}
                                    />
                                    <InputError text={errors.number} />
                                </div>
                            </div>
                            <div className='lg:col-span-5 col-span-12'>
                                <Label htmlFor="neighborhood">Bairro *</Label>
                                <div className="mt-1">
                                    <Input
                                        name="neighborhood"
                                        type='text'
                                        value={values.neighborhood || ""}
                                        onChange={handleChange}
                                    />
                                    <InputError text={errors.neighborhood} />
                                </div>
                            </div>
                            <div className='lg:col-span-5 col-span-12'>
                                <Label htmlFor="city">Cidade *</Label>
                                <div className="mt-1">
                                    <Input
                                        name="city"
                                        type='text'
                                        value={values.city || ""}
                                        onChange={handleChange}
                                    />
                                    <InputError text={errors.city} />
                                </div>
                            </div>
                            <div className='lg:col-span-2 col-span-12'>
                                <Label htmlFor="state">Estado *</Label>
                                <div className="mt-1">
                                    <Input
                                        name="state"
                                        type='text'
                                        value={values.state || ""}
                                        onChange={handleChange}
                                    />
                                    <InputError text={errors.state} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={activeTab !== "contact" ? "hidden" : ""}>
                        <div className="col-span-12 grid grid-cols-12 gap-x-4 gap-y-3 mt-2">
                            <div className='lg:col-span-6 col-span-12'>
                                <Label htmlFor="customer_email">E-mail Orçamentos</Label>
                                <div className="mt-1">
                                    <Input
                                        name="customer_email"
                                        type='email'
                                        value={values.customer_email || ""}
                                        onChange={handleChange}
                                    />
                                    <InputError text={errors.customer_email} />
                                </div>
                            </div>
                            <div className='lg:col-span-6 col-span-12'>
                                <Label htmlFor="billing_email">E-mail Cobrança</Label>
                                <div className="mt-1">
                                    <Input
                                        name="billing_email"
                                        type='email'
                                        value={values.billing_email || ""}
                                        onChange={handleChange}
                                    />
                                    <InputError text={errors.billing_email} />
                                </div>
                            </div>
                            <div className='lg:col-span-4 col-span-12'>
                                <Label htmlFor="customer_phone">Telefone Cliente</Label>
                                <div className="mt-1">
                                    <InputPhone
                                        name="customer_phone"
                                        value={values.customer_phone || ""}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className='lg:col-span-4 col-span-12'>
                                <Label htmlFor="responsible_phone">Telefone Responsável</Label>
                                <div className="mt-1">
                                    <InputPhone
                                        name="responsible_phone"
                                        value={values.responsible_phone || ""}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className='lg:col-span-4 col-span-12'>
                                <Label htmlFor="billing_phone">Telefone Cobrança</Label>
                                <div className="mt-1">
                                    <InputPhone
                                        name="billing_phone"
                                        value={values.billing_phone || ""}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className={activeTab !== "docs" ? "hidden" : ""}>
                        Em breve
                    </div>
                </div>

                <ButtonsFooterForm />
            </form>
        </FormModal >
    )
}