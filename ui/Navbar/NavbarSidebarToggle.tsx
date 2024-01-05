'use client'
import { IconMenu2 } from "@tabler/icons-react";
import { useSidebar } from "@/contexts/SidebarContext";

export default function NavbarSidebarToggle() {
    const { toggleDrawer } = useSidebar();

    return (
        <button onClick={toggleDrawer} className="mr-3 block lg:hidden">
            <IconMenu2 size={24} />
        </button>
    );
}
