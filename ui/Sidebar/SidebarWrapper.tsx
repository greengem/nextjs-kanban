'use client'
import { useSidebar } from "@/contexts/SidebarContext";
import Drawer from 'react-modern-drawer'
import { BoardSummary } from "@/types/types";
import SidebarMenu from "./SidebarMenu";
import 'react-modern-drawer/dist/index.css'

export default function SidebarWrapper({ boards } : { boards: BoardSummary[]}) {
    const { isOpen, toggleDrawer } = useSidebar();

    return (
        <SidebarMenu boards={boards} />
    )
}
