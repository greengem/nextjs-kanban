'use client'
import { useSidebarVisibility } from "@/contexts/SidebarContext";
import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";

export default function SidebarContents() {
    const { isSidebarVisible, isSlimSidebar } = useSidebarVisibility();

    const determineWidthClass = () => {
      if (!isSidebarVisible) {
        return 'w-0';
      } else if (isSlimSidebar) {
        return 'w-16';
      } else {
        return 'w-64';
      }
    };
    
    return (
      <aside className={`
        z-10 
        flex-none
        overflow-hidden 
        bg-white
        transition-width duration-500 ease-in-out 
        ${determineWidthClass()}`}
      >
        <div className="border-r-2 border-blue-300 h-full">
          <SidebarHeader />
          <SidebarNav />
        </div>
      </aside>
    );
  }
