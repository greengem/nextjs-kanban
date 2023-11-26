'use client'
import { useSidebarVisibility } from "@/contexts/SidebarContext";
import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";

export default function SidebarContents() {
    const { isSidebarVisible, isSlimSidebar } = useSidebarVisibility();
  
    return (
      <aside className={`
        bg-blue-500 
        z-10 
        overflow-hidden 
        transition-width duration-500 ease-in-out 
        ${isSidebarVisible ? 'w-64' : 'w-0'} 
        ${isSlimSidebar ? 'w-16' : 'w-64'}`}
      >
        <SidebarHeader />
        <SidebarNav />
      </aside>
    );
  }
