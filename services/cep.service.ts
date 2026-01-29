export type CepResponse = {
    bairro: string,
    cep: string,
    complemento: string,
    localidade: string,
    logradouro: string,
    uf: string,
    erro?: boolean
}

export type CepServiceResponse = {
    success: boolean,
    data?: CepResponse | null,
    message?: string,
}


class CEPService {
    async getAddressByCEP(cep: string): Promise<CepServiceResponse> {
        const cleanCep = cep.replace(/\D/g, '')

        if (cleanCep.length !== 8) {
            return {
                success: false,
                message: 'O CEP deve conter 8 dígitos numéricos.',
                data: null,
            }
        }

        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`, {
            cache: "no-store"
        });

        if (!response.ok) {
            return {
                success: false,
                message: 'Erro ao buscar o CEP.',
                data: null,
            }
        }

        const data: CepResponse = await response.json()

        if (data.erro) {
            return {
                success: false,
                message: 'CEP não encontrado.',
                data: null,
            }
        }

        return {
            success: true,
            message: 'CEP encontrado com sucesso.',
            data: {
                bairro: data.bairro ?? '',
                cep: data.cep ?? '',
                complemento: data.complemento ?? '',
                localidade: data.localidade ?? '',
                logradouro: data.logradouro ?? '',
                uf: data.uf ?? '',
            },
        }
    }
}

export const cepService = new CEPService();