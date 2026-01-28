export function getFirstLetter(str: string) {
    if (str && str.length > 0) {
        return str[0].toUpperCase();
    }

    return '';
}

export function getFirstName(fullName: string): string {
    if (fullName == undefined) {
        return '';
    } else {
        return fullName.trim().split(' ')[0];
    }
}

export function formatDatePTBR(inputDate: string) {
    if (inputDate === null || !inputDate || !/\d{4}-\d{2}-\d{2}/.test(inputDate)) {
        return 'Não informado'
    }

    const [year, month, day] = inputDate.split("-");
    return `${day}/${month}/${year}`;
}

export function unmaskPhone(value: string): string {
    if (!value) return '';

    return value.replace(/\D/g, "")
}

export function formatPhone(phone: string | null) {
    if (phone === null) return '';

    const cleaned = phone.replace(/\D/g, '');

    if (cleaned.length === 11) {
        return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (cleaned.length === 10) {
        return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }

    return phone;
}

export function formatCurrency(value: number | string | null) {
    if (value === null || undefined) return '';

    if (typeof value === "number") {
        return `R$ ${value.toFixed(2).replace(".", ",")}`; // Arredonda e formata
    }

    const numericValue = value.replace(/\D/g, ""); // Remove caracteres não numéricos
    const formattedValue = (Number(numericValue) / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    return formattedValue;
}

export function parseCurrency(value: string | number | null | undefined): number | null {
    if (value === null || value === undefined) {
        return null;
    }

    if (typeof value === "number") {
        return value;
    }

    const cleanValue = value
        .replace("R$", "")
        .replace(/\./g, "")
        .replace(",", ".")
        .trim();

    const parsed = parseFloat(cleanValue);
    return isNaN(parsed) ? null : parsed;
}

export function formatDocument(value?: string | null): string {
    if (!value) return "";

    const digits = value.replace(/\D/g, "");

    if (digits.length <= 11) {
        // CPF → 000.000.000-00
        return digits
            .replace(/^(\d{3})(\d)/, "$1.$2")
            .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
            .replace(/\.(\d{3})(\d)/, ".$1-$2")
            .slice(0, 14);
    }

    // CNPJ → 00.000.000/0000-00
    return digits
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .slice(0, 18);
}

export function generateBudgetCode(budgetKey: string): string {
    const digits = new Set<number>();

    while (digits.size < 4) {
        digits.add(Math.floor(Math.random() * 10));
    }

    const randomNumbers = Array.from(digits).join("");

    return `${budgetKey}${randomNumbers}`;
}
