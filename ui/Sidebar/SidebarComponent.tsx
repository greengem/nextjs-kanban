'use client'
import { useState } from 'react';
import { useSidebar } from "@/contexts/SidebarContext";
import Link from "next/link";
import { IconChevronDown } from "@tabler/icons-react";

export function Sidebar({ children }: { children: React.ReactNode }) {
    const { isOpen } = useSidebar();

    const sidebarClasses = isOpen 
        ? "sidebar w-64 fixed left-0 top-0 bottom-0 lg:relative lg:top-0 shrink-0 grow-0 bg-white z-50 lg:block border-r-1 border-primary z-50"
        : "sidebar w-64 fixed left-0 top-0 bottom-0 lg:relative lg:top-0 shrink-0 grow-0 bg-white z-50 hidden lg:block border-r-1 border-primary z-50";

    return (
        <div className={sidebarClasses}>
            {children}
        </div>
    );
}

export function Menu({ children }: { children: React.ReactNode }) {
    return (
        <ul className="menu">{children}</ul>
    );
}

export function SubMenu({ children, icon = null, title, defaultOpen = false }: { children: React.ReactNode, icon?: React.ReactNode, title: string, defaultOpen?: boolean }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <li className="sub-menu">
            <div className="flex items-center justify-between px-5 h-12 cursor-pointer border-b-1 border-zinc-200" onClick={() => setIsOpen(!isOpen)}>
                <div className="flex items-center">
                    <div className='w-8'>{icon && <span>{icon}</span>}</div>
                    <span className='text-sm whitespace-nowrap overflow-ellipsis block overflow-x-hidden'>{title}</span>
                </div>
                <button className="shrink-0">
                    <IconChevronDown size={18} />
                </button>
            </div>
            {isOpen && <ul>{children}</ul>}
        </li>
    );
}

export function MenuItem({ path, icon = null, title }: { path: string, icon?: React.ReactNode, title: string }) {
    const { toggleDrawer } = useSidebar();

    const handleClick = () => {
        toggleDrawer();
    };

    return (
        <li className="menu-item border-b-1 border-zinc-00">
            <Link href={path} className="flex h-12 items-center px-5 hover:bg-primary hover:text-white" onClick={handleClick}>
                <div className='w-8 shrink-0'>{icon && <span>{icon}</span>}</div><span className='text-sm whitespace-nowrap overflow-ellipsis block overflow-x-hidden'>{title}</span>
            </Link>
        </li>
    );
}
