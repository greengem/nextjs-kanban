'use client'
import ToggleSlimSidebarButton from "./ToggleSlimSidebarButton";
import { IconLayoutKanban, IconHome, IconDashboard } from "@tabler/icons-react";
import Link from "next/link";
import { useSidebarVisibility } from "@/contexts/SidebarContext";


const SidebarLinks = [
    {
        path: "/",
        label: "Home",
        Icon: IconHome,
    },
    {
        path: "/dashboard",
        label: "Dashboard",
        Icon: IconDashboard,
      },
      {
        path: "/board",
        label: "Boards",
        Icon: IconLayoutKanban,
      },
  ];

export default function SidebarNav() {
    const { isSlimSidebar } = useSidebarVisibility();
    return (
        <ul className="px-5 space-y-3 text-sm text-blue-500">
            {SidebarLinks.map((link, index) => (
                <li key={index}>
                <Link href={link.path} className="flex items-center space-x-3">
                    <span>{link.Icon && <link.Icon />}</span>
                    {!isSlimSidebar && <span>{link.label}</span>}
                </Link>
                </li>
            ))}
            <ToggleSlimSidebarButton />
        </ul>
    )
}