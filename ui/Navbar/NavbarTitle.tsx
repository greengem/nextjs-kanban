'use client'
import { useSidebarVisibility } from "@/contexts/SidebarContext"
import { IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";

export default function NavbarTitle() {
    const { toggleSidebar, isSidebarVisible } = useSidebarVisibility();

    return (
        <div className="flex items-center my-2 w-15 shrink-0 grow-0">
            {!isSidebarVisible && (
                <button onClick={toggleSidebar} className="mr-3"><IconMenu2 /></button>
            )}
            <p className="font-semibold text-lg tracking-tight">
                <Link href='/dashboard/'>Next.Kanban</Link></p>
        </div>
    )
}
