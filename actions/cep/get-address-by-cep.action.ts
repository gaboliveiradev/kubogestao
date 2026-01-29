"use server";

import { cepService } from "@/services/cep.service";

export type AddressFormResponse = {
    success: boolean;
    message?: string;
    data: {
        zipcode?: string;
        address?: string;
        neighborhood?: string;
        city?: string;
        state?: string;
    };
};

export async function getAddressByCEP(rawCep: string): Promise<AddressFormResponse> {
    if (!rawCep) {
        return {
            success: false,
            message: "Este CEP é inválido.",
            data: {},
        };
    }

    const address = await cepService.getAddressByCEP(rawCep);

    if (!address.success) {
        return {
            success: false,
            message: "Não foi possível localizar o endereço para este CEP.",
            data: {}
        };
    }

    return {
        success: true,
        data: {
            zipcode: address?.data?.cep,
            address: address?.data?.logradouro,
            neighborhood: address?.data?.bairro,
            city: address?.data?.localidade,
            state: address?.data?.uf,
        },
    };
}
