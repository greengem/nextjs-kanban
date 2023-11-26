'use client'
import { useSidebarVisibility } from "@/contexts/SidebarContext"
import { IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";

export default function SubNavbar () {

    return (
        <nav className="flex px-5 py-2 bg-blue-400 items-center justify-between">
            <ul className="flex items-center text-xs space-x-3 text-white overflow-x-scroll no-scrollbar">
                <li className="px-3 py-1"><Link href="#">Item 1</Link></li>
                <li className="bg-blue-500 rounded-md px-3 py-1"><Link href="#">Item 2</Link></li>
                <li className="px-3 py-1"><Link href="#">Item 3</Link></li>
                <li className="px-3 py-1"><Link href="#">Item 4</Link></li>
            </ul>
        </nav>
    )
}