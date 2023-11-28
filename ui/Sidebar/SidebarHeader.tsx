import { useSidebarVisibility } from "@/contexts/SidebarContext";
import { IconArrowLeft, IconFlower } from "@tabler/icons-react";

export default function SidebarHeader() {
    const { isSidebarVisible, isSlimSidebar, toggleSidebar } = useSidebarVisibility();
    return (
        <div className="px-5 py-4 text-blue-500">
            <button onClick={toggleSidebar}><IconArrowLeft /></button>
        </div>
    )
}