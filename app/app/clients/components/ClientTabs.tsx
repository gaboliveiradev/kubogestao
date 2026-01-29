/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { HugeiconsIcon } from "@hugeicons/react";
import { AttachmentIcon, Contact01Icon, MapsLocation01Icon } from "@hugeicons/core-free-icons";
import { Dispatch, SetStateAction, useState } from "react";
import { TabProps } from "@/types/tabs-props";
import AddressDataTab from "./tabs/AddressDataTab";
import InfoContactTab from "./tabs/InfoContactTab";
import DocumentsTab from "./tabs/DocumentsTab";

type TabValue = "address" | "contact" | "docs";

type Props = TabProps & {
    setLoader: (loader: { state: boolean; message: string }) => void;
    setValues: Dispatch<SetStateAction<Record<string, any>>>;
};

export default function ClientTabs({ values, errors, handleChange, setValues, setLoader }: Props) {
    const [activeTab, setActiveTab] = useState<TabValue>("address");

    function handleTabChange(value: string) {
        if (value === "address" || value === "contact" || value === "docs") {
            setActiveTab(value)
        }
    }

    return (
        <div className="lg:col-span-12 col-span-12 w-full py-2">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full mb-6">
                <div className="w-full border">
                    <TabsList className="inline-flex px-0 bg-transparent">
                        <TabsTrigger value="address">
                            <HugeiconsIcon icon={MapsLocation01Icon} />
                            Dados de Endereço
                        </TabsTrigger>
                        <TabsTrigger value="contact">
                            <HugeiconsIcon icon={Contact01Icon} />
                            Informações de Contato
                        </TabsTrigger>
                        <TabsTrigger value="docs">
                            <HugeiconsIcon icon={AttachmentIcon} />
                            Documentos
                        </TabsTrigger>
                    </TabsList>
                </div>
            </Tabs>

            <div className={activeTab !== "address" ? "hidden" : ""}>
                <AddressDataTab 
                    values={values}
                    errors={errors}
                    handleChange={handleChange}
                    setLoader={setLoader}
                    setValues={setValues}
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