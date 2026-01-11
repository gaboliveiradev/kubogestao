import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useTheme } from "next-themes";
import { HugeiconsIcon } from "@hugeicons/react";
import { LaptopSettingsIcon, Moon02Icon, Sun02Icon } from "@hugeicons/core-free-icons";

export default function SheetSystemConfig({ children }: { children: React.ReactNode }) {
    const { theme, setTheme } = useTheme();

    return (
        <Sheet>
            <SheetTrigger>
                {children}
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>Configurações do Sistema</SheetTitle>
                    <SheetDescription>
                        Preencha as configurações do sistema conforme preferir.
                    </SheetDescription>
                    <div className="grid grid-cols-12 gap-4 mt-2">
                        <div className='lg:col-span-12 col-span-12'>
                            <Label htmlFor="theme">Tema</Label>
                            <div className="mt-1">
                                <Select defaultValue={theme} onValueChange={setTheme}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="SELECIONE" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="system"><HugeiconsIcon icon={LaptopSettingsIcon} /> Sistema</SelectItem>
                                        <SelectItem value="light"><HugeiconsIcon icon={Sun02Icon} /> Claro</SelectItem>
                                        <SelectItem value="dark"><HugeiconsIcon icon={Moon02Icon} /> Escuro</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}