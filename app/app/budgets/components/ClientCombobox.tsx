"use client";

import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox";
import { ClientDTO } from "@/services/firebase/clients/dtos/clients.dto";
import { formatDocument } from "@/utils/functions/string";

type Props = {
    clients: ClientDTO[],
    value?: string,
    onSelect: (clientId: string) => void,
    disabled?: boolean,
    invalid?: boolean,
}

const normalize = (text: string) =>
    text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

const onlyDigits = (text: string) => text.replace(/\D/g, "");

function clientLabel(client: ClientDTO) {
    return `${formatDocument(client.document)} - ${client.corporate_name}`;
}

// Busca por nome (razão social / fantasia) ou CNPJ/CPF (com ou sem máscara)
function filterClient(client: ClientDTO, query: string) {
    const q = normalize(query);
    if (!q) return true;

    const name = normalize(`${client.corporate_name} ${client.fantasy_name ?? ""} ${client.company_nickname ?? ""}`);
    if (name.includes(q)) return true;

    const digits = onlyDigits(query);
    return digits.length > 0 && onlyDigits(client.document).includes(digits);
}

export default function ClientCombobox({ clients, value, onSelect, disabled, invalid }: Props) {
    const selected = clients.find((c) => c.id === value) ?? null;

    return (
        <Combobox
            items={clients}
            value={selected}
            onValueChange={(client: ClientDTO | null) => client && onSelect(client.id)}
            itemToStringLabel={clientLabel}
            isItemEqualToValue={(a: ClientDTO, b: ClientDTO) => a.id === b.id}
            filter={filterClient}
            disabled={disabled}
        >
            <ComboboxInput
                placeholder="Buscar por nome ou CNPJ..."
                className="w-full"
                aria-invalid={invalid}
            />
            <ComboboxContent>
                <ComboboxEmpty>Nenhum cliente encontrado.</ComboboxEmpty>
                <ComboboxList>
                    {(client: ClientDTO) => (
                        <ComboboxItem key={client.id} value={client} className="py-2">
                            <div className="flex flex-col min-w-0">
                                <span className="truncate font-medium">{client.corporate_name}</span>
                                <span className="text-xs text-muted-foreground">
                                    {formatDocument(client.document)}
                                    {client.city ? ` • ${client.city}/${client.state}` : ""}
                                </span>
                            </div>
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
}
