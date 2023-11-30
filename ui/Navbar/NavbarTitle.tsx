'use client'
import { useSidebarVisibility } from "@/contexts/SidebarContext"
import { IconMenu2 } from "@tabler/icons-react";

export default function NavbarTitle() {
    const { toggleSidebar, isSidebarVisible } = useSidebarVisibility();

    return (
        <div className="flex items-center my-2">
            {!isSidebarVisible && (
                <button onClick={toggleSidebar} className="mr-3"><IconMenu2 /></button>
            )}
            <p className="font-semibold text-lg tracking-tight">Reactify Tasks</p>
        </div>
    )
}
