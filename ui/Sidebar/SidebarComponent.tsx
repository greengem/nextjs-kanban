'use client'
import { ReactNode, useState } from 'react';
import { useSidebar } from "@/contexts/SidebarContext";
import Link from "next/link";
import { IconChevronRight } from "@tabler/icons-react";
import { motion } from 'framer-motion';

interface SidebarProps {
    children: ReactNode;
}

interface MenuProps {
    children: ReactNode;
}

interface SubMenuProps {
    children: ReactNode;
    icon?: ReactNode;
    title: string;
    defaultOpen?: boolean;
}

interface MenuItemProps {
    path: string;
    icon?: React.ReactNode;
    title: string;
    className?: string;
}


// Sidebar Parent
export function Sidebar({ children }: SidebarProps) {
    const { isOpen } = useSidebar();

    const sidebarClasses = isOpen 
        ? "sidebar w-64 fixed left-0 top-0 bottom-0 lg:relative lg:top-0 shrink-0 grow-0 bg-white z-50 lg:block z-50"
        : "sidebar w-64 fixed left-0 top-0 bottom-0 lg:relative lg:top-0 shrink-0 grow-0 bg-white z-50 hidden lg:block z-50";

    return (
        <div className={sidebarClasses}>
            {children}
        </div>
    );
}


// Sidebar Menu, there can be multiple menus in a sidebar
export function Menu({ children }: MenuProps) {
    return (
        <ul className="menu h-full relative">{children}</ul>
    );
}


// Sidebar Submenu dropdown.
export function SubMenu({ children, icon, title, defaultOpen = false }: SubMenuProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <li className="sub-menu">
            <div className="flex items-center justify-between pl-5 h-12 cursor-pointer" onClick={toggleOpen}>
                <div className="flex items-center">
                    <div className='w-8'>{icon && <span className='text-primary'>{icon}</span>}</div>
                    <span className='text-sm whitespace-nowrap overflow-ellipsis block overflow-x-hidden'>{title}</span>
                </div>
                <button className="shrink-0 p-3">
                    <motion.div
                        initial={{ rotate: defaultOpen ? 90 : 0 }}
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ 
                            duration: 0.2,
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                        }}
                    >
                        <IconChevronRight size={18} />
                    </motion.div>
                </button>
            </div>
            {isOpen && <ul>{children}</ul>}
        </li>
    );
}


// Menu Items
export function MenuItem({ path, icon, title, className = "" }: MenuItemProps) {
    const { toggleDrawer } = useSidebar();

    const handleClick = () => {
        toggleDrawer();
    };

    const combinedClassName = `flex h-12 items-center px-5 hover:bg-primary hover:text-white ${className}`;

    return (
        <li className="menu-item group">
            <Link href={path} className={combinedClassName} onClick={handleClick}>
                <div className='w-8 shrink-0'>{icon && <span className='text-primary group-hover:text-white'>{icon}</span>}</div>
                <span className='text-sm whitespace-nowrap overflow-ellipsis block overflow-x-hidden'>{title}</span>
            </Link>
        </li>
    );
}
