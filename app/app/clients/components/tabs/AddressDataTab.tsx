/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAddressByCEP } from "@/actions/cep/get-address-by-cep.action";
import { InputCEP } from "@/components/form/InputCEP";
import { InputError } from "@/components/form/InputError";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabProps } from "@/types/tabs-props";
import { showErrorSonner } from "@/utils/sonner";
import { Dispatch, SetStateAction } from "react";

type Props = TabProps & {
    setLoader: (loader: { state: boolean; message: string }) => void;
    setValues: Dispatch<SetStateAction<Record<string, any>>>;
};

export default function AddressDataTab({ values, setValues, errors, handleChange, setLoader }: Props) {
    async function handleCEPBlur(e: React.FocusEvent<HTMLInputElement>) {
        const cep = e.target.value;

        if (!cep) return;

        setLoader({ state: true, message: "Buscando endereço..." });

        try {
            const result = await getAddressByCEP(cep);

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
    )
}