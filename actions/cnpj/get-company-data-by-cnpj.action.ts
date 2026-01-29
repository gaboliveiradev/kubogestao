"use server";

import { cnpjService } from "@/services/cnpj.service";

export type CompanyDataFormResponse = {
    success: boolean;
    message?: string;
    data: {
        document?: string;
        corporate_name?: string;
        fantasy_name?: string;
        address?: string;
        number?: string;    
        neighborhood?: string;
        city?: string;
        state?: string;
        zipcode?: string;
    };
};

export async function getCompanyDataByCNPJ(rawCNPJ: string): Promise<CompanyDataFormResponse> {
    if (!rawCNPJ) {
        return {
            success: false,
            message: "Este CEP é inválido.",
            data: {},
        };
    }

    const company = await cnpjService.getCompanyDataByCNPJ(rawCNPJ);

    if (!company.success) {
        return {
            success: false,
            message: "Não foi possível localizar os dados da empresa para este CNPJ.",
            data: {}
        };
    }

    return {
        success: true,
        data: {
            address: company?.data?.logradouro,
            neighborhood: company?.data?.bairro,
            city: company?.data?.municipio,
            state: company?.data?.uf,
            corporate_name: company?.data?.razao_social,
            fantasy_name: company?.data?.nome_fantasia,
            document: company?.data?.cnpj,
            number: company?.data?.numero,  
            zipcode: company?.data?.cep,    
        },
    };
}
