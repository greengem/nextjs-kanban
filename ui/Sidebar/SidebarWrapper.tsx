'use client'
import { useSidebar } from "@/contexts/SidebarContext";
import Drawer from 'react-modern-drawer'
import { BoardSummary } from "@/types/types";
import 'react-modern-drawer/dist/index.css'
import SidebarMenu from "./SidebarMenu";

export default function SidebarWrapper({ boards } : { boards: BoardSummary[]}) {
    const { isOpen, toggleDrawer } = useSidebar();

    return (
        <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            direction='left'
        >
            <SidebarMenu boards={boards} />
        </Drawer>
    )
}
