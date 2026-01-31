import { InputDocument } from "@/components/form/InputDocument";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Briefcase03Icon, CorporateIcon, FileText, Mail01Icon, TelephoneIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function BasicStep() {
    return (
        <div className="col-span-12 grid grid-cols-12 gap-x-4 gap-y-3 mt-2">
            <div className='lg:col-span-4 col-span-12 space-y-2'>
                <Label htmlFor="document" className="text-sm font-medium">
                    CNPJ/CPF *
                </Label>
                <div className="relative">
                    <HugeiconsIcon icon={FileText} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <InputDocument
                        name="document"
                        className="pl-11"
                    />
                </div>
            </div>

            <div className='lg:col-span-8 col-span-12 space-y-2'>
                <Label htmlFor="corporate_name" className="text-sm font-medium">
                    Razão Social/Nome *
                </Label>
                <div className="relative">
                    <HugeiconsIcon icon={CorporateIcon} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        name="corporate_name"
                        placeholder="Razão Social ou Nome"
                        className="kubo-input pl-11"
                        maxLength={18}
                    />
                </div>
            </div>

            <div className='lg:col-span-5 col-span-12 space-y-2'>
                <Label htmlFor="fantasy_name" className="text-sm font-medium">
                    Nome Fantasia
                </Label>
                <div className="relative">
                    <HugeiconsIcon icon={Briefcase03Icon} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        name="fantasy_name"
                        placeholder="Nome Fantasia"
                        className="pl-11"
                    />
                </div>
            </div>

            <div className='lg:col-span-4 col-span-12 space-y-2'>
                <Label htmlFor="email" className="text-sm font-medium">
                    Email
                </Label>
                <div className="relative">
                    <HugeiconsIcon icon={Mail01Icon} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        name="email"
                        className="pl-11"
                        type="email"
                        placeholder="Email da Empresa"
                    />
                </div>
            </div>

            <div className='lg:col-span-3 col-span-12 space-y-2'>
                <Label htmlFor="phone" className="text-sm font-medium">
                    Telefone
                </Label>
                <div className="relative">
                    <HugeiconsIcon icon={TelephoneIcon} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        name="phone"
                        className="pl-11"
                        placeholder="Telefone da Empresa"
                    />
                </div>
            </div>
        </div>
    );
}
