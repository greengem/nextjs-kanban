'use client'
import { useSidebarVisibility } from "@/contexts/SidebarContext"
import Link from "next/link";
import { IconMenu2 } from "@tabler/icons-react";

export default function Navbar () {
    const { toggleSidebar, isSidebarVisible } = useSidebarVisibility();

    return (
        <nav className="flex px-5 py-4 text-blue-500 bg-white items-center justify-between border-b-2 border-blue-300">
            <div className="flex items-center">
                {!isSidebarVisible && (
                    <button onClick={toggleSidebar} className="mr-3"><IconMenu2 /></button>
                )}
                <p className="font-semibold mr-10">Reactify Tasks</p>
            </div>
        </nav>
    )
}