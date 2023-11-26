'use client'
import { useSidebarVisibility } from "@/contexts/SidebarContext"
import { IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand } from "@tabler/icons-react";

export default function ToggleSlimSidebarButton() {
  const { isSlimSidebar, toggleSlimSidebar } = useSidebarVisibility();

  return (
    <li>
      {isSlimSidebar
        ? (
          <button onClick={toggleSlimSidebar} className="w-full flex items-center space-x-3">
            <span><IconLayoutSidebarLeftExpand /></span>
          </button>
        ) : (
          <button onClick={toggleSlimSidebar} className="w-full flex items-center space-x-3">
            <span><IconLayoutSidebarLeftCollapse /></span>
            <span>Slim</span>
          </button>
        )
      }
    </li>
  );
}
