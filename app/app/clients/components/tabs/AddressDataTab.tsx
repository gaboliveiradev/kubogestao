import { InputCEP } from "@/components/form/InputCEP";
import { InputError } from "@/components/form/InputError";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabProps } from "@/types/tabs-props";
import { FieldLoader } from "@/components/form/FieldLoader";
import type { Lookup } from "../../clients-form-modal";

type Props = TabProps & {
    lookup: Lookup;
    onCepBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export default function AddressDataTab({ values, errors, handleChange, lookup, onCepBlur }: Props) {
    const cepLoading = lookup === "cep";
    // o CNPJ também preenche o endereço
    const addressLoading = lookup === "cep" || lookup === "cnpj";

    return (
        <div className="col-span-12 grid grid-cols-12 gap-x-4 gap-y-3 mt-2">

            <div className="lg:col-span-3 col-span-12 space-y-2">
                <Label htmlFor="zipcode">CEP *</Label>
                <div className="mt-1">
                    <FieldLoader loading={cepLoading} variant="spinner">
                        <InputCEP
                            name="zipcode"
                            value={values.zipcode || ""}
                            placeholder="Informe o CEP"
                            onChange={handleChange}
                            onBlur={onCepBlur}
                            invalid={!!errors.zipcode}
                        />
                    </FieldLoader>
                    <InputError text={errors.zipcode} />
                </div>
            </div>
            <div className='lg:col-span-7 col-span-12 space-y-2'>
                <Label htmlFor="address">Logradouro *</Label>
                <div className="mt-1">
                    <FieldLoader loading={addressLoading}>
                        <Input
                            name="address"
                            type='text'
                            value={values.address || ""}
                            onChange={handleChange}
                            aria-invalid={!!errors.address}
                        />
                    </FieldLoader>
                    <InputError text={errors.address} />
                </div>
            </div>
            <div className='lg:col-span-2 col-span-12 space-y-2'>
                <Label htmlFor="number">Número *</Label>
                <div className="mt-1">
                    <FieldLoader loading={lookup === "cnpj"}>
                        <Input
                            name="number"
                            type='text'
                            value={values.number || ""}
                            onChange={handleChange}
                            aria-invalid={!!errors.number}
                        />
                    </FieldLoader>
                    <InputError text={errors.number} />
                </div>
            </div>
            <div className='lg:col-span-5 col-span-12 space-y-2'>
                <Label htmlFor="neighborhood">Bairro *</Label>
                <div className="mt-1">
                    <FieldLoader loading={addressLoading}>
                        <Input
                            name="neighborhood"
                            type='text'
                            value={values.neighborhood || ""}
                            onChange={handleChange}
                            aria-invalid={!!errors.neighborhood}
                        />
                    </FieldLoader>
                    <InputError text={errors.neighborhood} />
                </div>
            </div>
            <div className='lg:col-span-5 col-span-12 space-y-2'>
                <Label htmlFor="city">Cidade *</Label>
                <div className="mt-1">
                    <FieldLoader loading={addressLoading}>
                        <Input
                            name="city"
                            type='text'
                            value={values.city || ""}
                            onChange={handleChange}
                            aria-invalid={!!errors.city}
                        />
                    </FieldLoader>
                    <InputError text={errors.city} />
                </div>
            </div>
            <div className='lg:col-span-2 col-span-12 space-y-2'>
                <Label htmlFor="state">Estado *</Label>
                <div className="mt-1">
                    <FieldLoader loading={addressLoading}>
                        <Input
                            name="state"
                            type='text'
                            value={values.state || ""}
                            onChange={handleChange}
                            aria-invalid={!!errors.state}
                        />
                    </FieldLoader>
                    <InputError text={errors.state} />
                </div>
            </div>
        </div>
    )
}