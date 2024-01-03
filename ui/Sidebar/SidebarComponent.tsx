import { useState } from 'react';
import { useSidebar } from "@/contexts/SidebarContext";
import Link from "next/link";
import { IconChevronDown } from "@tabler/icons-react";

export function Sidebar({ children }: { children: React.ReactNode }) {
    return (
        <div className="sidebar">{children}</div>
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
            <div className="flex items-center justify-between px-5 h-12 cursor-pointer border-b-1 border-zinc-300 hover:bg-primary hover:text-white" onClick={() => setIsOpen(!isOpen)}>
                <div className="flex items-center">
                    <div className='w-8'>{icon && <span>{icon}</span>}</div>
                    <span>{title}</span>
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
        <li className="menu-item border-b-1 border-zinc-300">
            <Link href={path} className="flex h-12 items-center px-5 hover:bg-primary hover:text-white" onClick={handleClick}>
                <div className='w-8'>{icon && <span>{icon}</span>}</div> {title}
            </Link>
        </li>
    );
}
