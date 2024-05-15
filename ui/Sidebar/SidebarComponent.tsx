'use client'
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from 'next/navigation'

interface SidebarProps {
    children: React.ReactNode;
}

interface MenuProps {
    children: React.ReactNode;
}

interface MenuItemProps {
    path: string;
    icon?: React.ReactNode;
    title: string;
    active?: boolean;
}


// Sidebar Parent
export function Sidebar({ children }: SidebarProps) {
    return (
        <div className="w-16 fixed left-0 top-0 bottom-0 lg:relative lg:top-0 shrink-0 grow-0 bg-zinc-950 z-50 hidden lg:block">
            {children}
        </div>
    );
}


// Sidebar Menu, there can be multiple menus in a sidebar
export function Menu({ children }: MenuProps) {
    return (
        <ul className="flex flex-col grow items-center gap-5 py-5">{children}</ul>
    );
}


// Menu Items
export function MenuItem({ path, icon }: MenuItemProps) {
    const pathname = usePathname()
    const isActive = pathname === path;

    return (
        <li className="menu-item group">
            <Link href={path} className={clsx('flex items-center hover:text-white rounded-md hover:bg-zinc-900', { 'bg-zinc-900': isActive })}>
                <div className='p-2 rounded-lg text-primary'>
                    {icon}
                </div>
            </Link>
        </li>
    );
}
