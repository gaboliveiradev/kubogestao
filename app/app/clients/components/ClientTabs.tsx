/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs } from "@/components/ui/tabs";
import { ModalTabsList, ModalTabsTrigger } from "@/components/form/ModalTabs";
import { HugeiconsIcon } from "@hugeicons/react";
import { AttachmentIcon, Contact01Icon, MapsLocation01Icon } from "@hugeicons/core-free-icons";
import { useEffect, useState } from "react";
import { TabProps } from "@/types/tabs-props";
import AddressDataTab from "./tabs/AddressDataTab";
import InfoContactTab from "./tabs/InfoContactTab";
import DocumentsTab from "./tabs/DocumentsTab";
import type { Lookup } from "../clients-form-modal";

type TabValue = "address" | "contact" | "docs";

const ADDRESS_FIELDS = ["zipcode", "address", "number", "neighborhood", "city", "state"];
const CONTACT_FIELDS = ["customer_email", "billing_email"];

type Props = TabProps & {
    lookup: Lookup;
    onCepBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    /** incrementa a cada submit inválido, para abrir a aba que contém o primeiro erro */
    submitAttempt: number;
};

export default function ClientTabs({ values, errors, handleChange, lookup, onCepBlur, submitAttempt }: Props) {
    const [activeTab, setActiveTab] = useState<TabValue>("address");

    useEffect(() => {
        if (!submitAttempt) return;

        if (ADDRESS_FIELDS.some((f) => errors[f])) setActiveTab("address");
        else if (CONTACT_FIELDS.some((f) => errors[f])) setActiveTab("contact");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submitAttempt]);

    function handleTabChange(value: string) {
        if (value === "address" || value === "contact" || value === "docs") {
            setActiveTab(value)
        }
    }

    return (
        <div className="lg:col-span-12 col-span-12 w-full py-2">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full mb-4">
                <div className="w-full">
                    <ModalTabsList>
                        <ModalTabsTrigger value="address">
                            <HugeiconsIcon icon={MapsLocation01Icon} />
                            Dados de Endereço
                        </ModalTabsTrigger>
                        <ModalTabsTrigger value="contact">
                            <HugeiconsIcon icon={Contact01Icon} />
                            Informações de Contato
                        </ModalTabsTrigger>
                        <ModalTabsTrigger value="docs">
                            <HugeiconsIcon icon={AttachmentIcon} />
                            Documentos
                        </ModalTabsTrigger>
                    </ModalTabsList>
                </div>
            </Tabs>

            <div className={activeTab !== "address" ? "hidden" : ""}>
                <AddressDataTab 
                    values={values}
                    errors={errors}
                    handleChange={handleChange}
                    lookup={lookup}
                    onCepBlur={onCepBlur}
                />
            </div>

            <div className={activeTab !== "contact" ? "hidden" : ""}>
                <InfoContactTab 
                    values={values}
                    errors={errors}
                    handleChange={handleChange} 
                />
            </div>

            <div className={activeTab !== "docs" ? "hidden" : ""}>
                <DocumentsTab />
            </div>
        </div>
    )
}