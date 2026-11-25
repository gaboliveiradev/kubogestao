"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getFirstLetter, getFirstName } from "@/utils/functions/string";
import { manageAuth } from "@/actions/auth";
import { HugeiconsIcon } from "@hugeicons/react";
import { MoneySendSquareIcon, UnfoldMoreIcon, LogoutSquare02Icon, WhatsappIcon, UserIcon, PaintBrush01Icon, LaptopSettingsIcon, Sun02Icon, Moon02Icon } from "@hugeicons/core-free-icons";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/auth-context";

interface Props {
    isMobile?: boolean
};

export default function DropdownMenuProfile({ isMobile = false }: Props) {
    const { user } = useAuthContext();
    const { theme, setTheme } = useTheme();
    const router = useRouter();

    const nameUser = user?.user?.name || '';
    const emailUser = user?.user?.email || '';
    const avatarURL = user?.user?.image || '';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {!isMobile ? (
                    <Avatar className="h-10 w-10 cursor-pointer rounded-md!">
                        <AvatarImage className="rounded-md!" src={avatarURL} />
                        <AvatarFallback className="rounded-md!">
                            {getFirstLetter(nameUser)}
                        </AvatarFallback>
                    </Avatar>
                ) : (
                    <div className="flex flex-row justify-between items-center gap-2 w-full">
                        <div className="flex gap-2">
                            <Avatar className="h-10 w-10 cursor-pointer rounded-md!">
                                <AvatarImage className="rounded-md!" src={avatarURL} />
                                <AvatarFallback className="rounded-md!">
                                    {getFirstLetter(nameUser)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-semibold">{getFirstName(nameUser)}</div>
                                <div className="text-xs font-medium">{emailUser}</div>
                            </div>
                        </div>
                        <HugeiconsIcon icon={UnfoldMoreIcon} className="w-5 h-5" />
                    </div>
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-70">
                {!isMobile && (
                    <>
                        <DropdownMenuLabel>
                            <div className="flex flex-col justify-center items-center gap-2">
                                <Avatar className="h-14 w-14 rounded-md!">
                                    <AvatarImage className="rounded-md!" src={avatarURL} />
                                    <AvatarFallback className="rounded-md!">
                                        {getFirstLetter(nameUser)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="text-center">
                                    <div>{getFirstName(nameUser)}</div>
                                    <div className="text-xs">{emailUser}</div>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                    </>
                )}
                <DropdownMenuItem onSelect={() => router.push("/app/settings")}>
                    <HugeiconsIcon icon={UserIcon} /> Perfil
                </DropdownMenuItem>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <HugeiconsIcon icon={PaintBrush01Icon} /> Tema
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuRadioGroup value={theme ?? "system"} onValueChange={setTheme}>
                            <DropdownMenuRadioItem value="system"><HugeiconsIcon icon={LaptopSettingsIcon} /> Sistema</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="light"><HugeiconsIcon icon={Sun02Icon} /> Claro</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="dark"><HugeiconsIcon icon={Moon02Icon} /> Escuro</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuItem>
                    <HugeiconsIcon icon={MoneySendSquareIcon} /> Assinatura
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <HugeiconsIcon icon={WhatsappIcon} /> Suporte
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <div onClick={manageAuth} className="flex gap-2 justify-start items-center w-full">
                        <HugeiconsIcon icon={LogoutSquare02Icon} />
                        Sair
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}