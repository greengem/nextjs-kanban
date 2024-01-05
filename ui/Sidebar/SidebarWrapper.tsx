'use client'
import { useSidebar } from "@/contexts/SidebarContext";
import { BoardSummary } from "@/types/types";
import SidebarMenu from "./SidebarMenu";

export default function SidebarWrapper({ boards } : { boards: BoardSummary[]}) {
    const { isOpen, toggleDrawer } = useSidebar();

    return (
        <SidebarMenu boards={boards} />
    )
}
