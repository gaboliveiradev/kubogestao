import { InputError } from "@/components/form/InputError";
import { InputPhone } from "@/components/form/InputPhone";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabProps } from "@/types/tabs-props";

export default function InfoContactTab({ values, errors, handleChange }: TabProps) {
    return (
        <div className="col-span-12 grid grid-cols-12 gap-x-4 gap-y-3 mt-2">
            <div className='lg:col-span-6 col-span-12 space-y-2'>
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
            <div className='lg:col-span-6 col-span-12 space-y-2'>
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
            <div className='lg:col-span-4 col-span-12 space-y-2'>
                <Label htmlFor="customer_phone">Telefone Cliente</Label>
                <div className="mt-1">
                    <InputPhone
                        name="customer_phone"
                        value={values.customer_phone || ""}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className='lg:col-span-4 col-span-12 space-y-2'>
                <Label htmlFor="responsible_phone">Telefone Responsável</Label>
                <div className="mt-1">
                    <InputPhone
                        name="responsible_phone"
                        value={values.responsible_phone || ""}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className='lg:col-span-4 col-span-12 space-y-2'>
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
    )
}