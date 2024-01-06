'use client'
import { useSidebar } from "@/contexts/SidebarContext";
import { BoardSummary } from "@/types/types";
import SidebarMenu from "./SidebarMenu";
import SidebarOverlay from "./SidebarOverlay";

export default function SidebarWrapper({ boards } : { boards: BoardSummary[]}) {
    const { isOpen, toggleDrawer } = useSidebar();
    return (
        <>
            <SidebarOverlay isVisible={isOpen} onClick={toggleDrawer} />
            <SidebarMenu boards={boards} />
        </>
    )
}
