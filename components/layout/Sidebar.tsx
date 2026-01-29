"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
// import DropdownMenuProfile from "./dropdown-profile";
import { DashboardSquare02Icon, FolderLibraryIcon, Settings01Icon, UserGroup03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon, HugeiconsIconProps } from "@hugeicons/react";
import DropdownMenuProfile from "@/components/layout/DropdownProfile";
import SheetSystemConfig from "./SheetSystemConfig";
import Image from "next/image";

export type SidebarItemProps = {
    Icon: HugeiconsIconProps["icon"]
    title: string
    path: string
}

export function Sidebar() {
    return (
        <div className="flex w-full flex-col bg-muted/40">
            {/* ============ SIDEBAR DESKTOP ============ */}
            <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 border-r bg-background sm:flex flex-col'>
                <nav className='flex flex-col items-center gap-2 px-2 py-2'>
                    <TooltipProvider>
                        <div className='flex h-10 w-10 text-primary  text-lg items-center justify-center md:text-base gap-2'>
                            <Image src='/favicon.png' alt="KuboGestao" width="30" height="30" />
                            <span className='sr-only'>KuboGestao</span>
                        </div>

                        <SidebarDesktopItem Icon={DashboardSquare02Icon} title='Dashboard' path='/app' />
                        <SidebarDesktopItem Icon={UserGroup03Icon} title='Clientes' path='/app/clients' />
                        <SidebarDesktopItem Icon={FolderLibraryIcon} title='Orçamentos' path='/app/budgets' />
                        <Separator />
                        <SheetSystemConfig>
                            <SidebarDesktopItem Icon={Settings01Icon} title='Configurações' path='/' />
                        </SheetSystemConfig>
                    </TooltipProvider>
                </nav>

                <nav className="mt-auto flex flex-col items-center gap-4 p-2">
                    <DropdownMenuProfile />
                </nav>
            </aside>
        </div>
    )
}

export function SidebarDesktopItem({ Icon, title, path }: SidebarItemProps) {
    const pathname = usePathname();
    const selected = (pathname == path) ? true : false;

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                {path == "/" ? (
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${selected ? 'bg-primary text-white' : 'text-muted-foreground hover:text-white hover:bg-primary'} transition-colors`}>
                        <HugeiconsIcon icon={Icon} className='h-5 w-5' />
                        <span className='sr-only'>{title}</span>
                    </div>
                ) : (
                    <Link href={path} className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${selected ? 'bg-primary text-white' : 'text-muted-foreground hover:text-white hover:bg-primary'} transition-colors`}>
                        <HugeiconsIcon icon={Icon} className='h-5 w-5' />
                        <span className='sr-only'>{title}</span>
                    </Link>
                )}
            </TooltipTrigger>
            <TooltipContent side='left'>{title}</TooltipContent>
        </Tooltip>
    )
}

export function SidebarMobileItem({ Icon, title, path }: SidebarItemProps) {
    const pathname = usePathname();
    const selected = (pathname == path) ? true : false;

    return (
        <>
            {path == "/" ? (
                <div className={`text-[14.5px] flex items-center gap-2 px-1.5 py-1.5 rounded-md ${selected ? 'bg-primary text-white' : 'text-muted-foreground hover:text-white hover:bg-primary'} transition-colors`}>
                    <HugeiconsIcon icon={Icon} className='h-5 w-5 transition-all' />
                    {title}
                </div>
            ) : (
                <Link href={path} className={`text-[14.5px] flex items-center gap-2 px-1.5 py-1.5 rounded-md ${selected ? 'bg-primary text-white' : 'text-muted-foreground hover:text-white hover:bg-primary'} transition-colors`}>
                    <HugeiconsIcon icon={Icon} className='h-5 w-5 transition-all' />
                    {title}
                </Link>
            )}
        </>
    )
}

export function SidebarDivisorItem({ title }: { title: string }) {
    return <h1 className='text-sm text-muted-foreground'>{title}</h1>
}