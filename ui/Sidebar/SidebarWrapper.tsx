'use client'
import { BoardSummarySidebar } from "@/types/types";
import { useSidebar } from "@/contexts/SidebarContext";
import SidebarMenu from "./SidebarMenu";
import SidebarOverlay from "./SidebarOverlay";

export default function SidebarWrapper({ boards } : { boards: BoardSummarySidebar[]}) {
    const { isOpen, toggleDrawer } = useSidebar();
    return (
        <>
            <SidebarOverlay isVisible={isOpen} onClick={toggleDrawer} />
            <SidebarMenu boards={boards} />
        </>
    )
}
