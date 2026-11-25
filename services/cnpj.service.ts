export type CNPJResponseAPI = {
    estabelecimento: {
        cnpj: string,
        nome_fantasia: string,
        tipo_logradouro: string,
        logradouro: string,
        numero: string,
        cep: string,
        bairro: string,
        estado: {
            sigla: string
        },
        cidade: {
            nome: string
        },
        email?: string | null,
        ddd1?: string | null,
        telefone1?: string | null,
    },
    razao_social: string,
    socios?: {
        nome: string,
        qualificacao_socio?: { descricao?: string } | null,
    }[],
}

export type CNPJResponse = {
    cnpj: string,
    razao_social: string,
    nome_fantasia: string,
    bairro: string,
    numero: string,
    logradouro: string,
    uf: string,
    municipio: string,
    cep: string,
    responsavel: string,
    email: string,
    telefone: string,
}

export type CNPJServiceResponse = {
    success: boolean,
    data?: CNPJResponse | null,
    message?: string,
}

class CNPJService {
    async getCompanyDataByCNPJ(cnpj: string): Promise<CNPJServiceResponse> {
        const cleanCNPJ = cnpj.replace(/\D/g, '');

        if (cleanCNPJ.length !== 14) {
            return {
                success: false,
                message: 'O CNPJ deve conter 14 dígitos numéricos.',
                data: null,
            };
        }

        const response = await fetch(`https://publica.cnpj.ws/cnpj/${cleanCNPJ}`, {
            cache: "no-store"
        });

        if (!response.ok) {
            const text = await response.text();

            return {
                success: false,
                message: `Erro ao consultar CNPJ (${response.status}): ${text}`,
                data: null,
            };
        }

        const data: CNPJResponseAPI = await response.json();

        const logradouro = `${data.estabelecimento.tipo_logradouro} ${data.estabelecimento.logradouro}`.trim();

        // responsável: sócio-administrador; se não houver, o primeiro sócio
        const socios = data?.socios ?? [];
        const administrador = socios.find((socio) =>
            socio.qualificacao_socio?.descricao?.toLowerCase().includes('administrador')
        );
        const responsavel = (administrador ?? socios[0])?.nome ?? '';

        const telefone = `${data?.estabelecimento?.ddd1 ?? ''}${data?.estabelecimento?.telefone1 ?? ''}`;

        return {
            success: true,
            message: 'CNPJ encontrado com sucesso.',
            data: {
                bairro: data?.estabelecimento?.bairro ?? '',
                cnpj: data?.estabelecimento?.cnpj ?? '',
                razao_social: data?.razao_social ?? '',
                nome_fantasia: data?.estabelecimento?.nome_fantasia ?? '',
                logradouro: logradouro ?? '',
                numero: data?.estabelecimento?.numero ?? '',
                municipio: data?.estabelecimento?.cidade?.nome ?? '',
                uf: data?.estabelecimento?.estado?.sigla ?? '',
                cep: data?.estabelecimento?.cep ?? '',
                responsavel,
                email: data?.estabelecimento?.email?.toLowerCase() ?? '',
                telefone,
            },
        }
    }
}

export const cnpjService = new CNPJService();