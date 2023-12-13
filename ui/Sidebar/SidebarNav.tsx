import { IconLayoutKanban } from "@tabler/icons-react";
import Link from "next/link";


const SidebarLinks = [
    {
        path: "/board",
        label: "Boards",
        Icon: IconLayoutKanban,
    }
];

export default function SidebarNav() {
    return (
        <ul className="px-5 pt-3 space-y-5 text-sm text-primary">
            {SidebarLinks.map((link, index) => (
                <li key={index}>
                    <Link href={link.path} className="flex items-center space-x-3" aria-label={link.label}>
                        <span>{link.Icon && <link.Icon />}</span>
                    </Link>
                </li>
            ))}
        </ul>
    )
}