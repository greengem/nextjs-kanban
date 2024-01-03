'use client'
import { IconMenu2 } from "@tabler/icons-react";
import { useSidebar } from "@/contexts/SidebarContext";

export default function NavbarSidebarToggle() {
    const { toggleSidebar } = useSidebar();

    return (
        <button className="mr-3 block lg:hidden" onClick={toggleSidebar}>
            <IconMenu2 size={24} />
        </button>
    );
}
