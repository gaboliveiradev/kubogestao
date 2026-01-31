/* eslint-disable @typescript-eslint/no-explicit-any */

import { InputCEP } from "@/components/form/InputCEP"
import { InputDocument } from "@/components/form/InputDocument"
import { InputError } from "@/components/form/InputError"
import { InputPhone } from "@/components/form/InputPhone"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type ClientTabProps = {
    values: any
    errors: any
    handleChange: (e: any) => void
}

export default function ClientTab({ values, errors, handleChange }: ClientTabProps) {
    return (
        <div className="grid grid-cols-12 gap-4 mb-4">
            <div className='lg:col-span-4 col-span-12 space-y-2'>
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
            <div className='lg:col-span-8 col-span-12 space-y-2'>
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
            <div className='lg:col-span-3 col-span-12 space-y-2'>
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

            <div className='lg:col-span-5 col-span-12 space-y-2'>
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

            <div className='lg:col-span-4 col-span-12 space-y-2'>
                <Label htmlFor="budget_phone">Telefone Orçamento</Label>
                <div className="mt-1">
                    <InputPhone
                        name="budget_phone"
                        value={values.budget_phone || ""}
                        onChange={handleChange}
                    />
                </div>
            </div>


            <div className="lg:col-span-3 col-span-12 space-y-2">
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
            <div className='lg:col-span-9 col-span-12 space-y-2'>
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
            <div className='lg:col-span-2 col-span-12 space-y-2'>
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
            <div className='lg:col-span-7 col-span-12 space-y-2'>
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
            <div className='lg:col-span-3 col-span-12 space-y-2'>
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
    )
}