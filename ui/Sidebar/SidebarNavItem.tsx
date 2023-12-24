'use client'
import { usePathname } from 'next/navigation'
import Link from "next/link";

export default function SidebarNavItem({
    boardId, boardTitle
} : {
    boardId: string, boardTitle: string
}) {
    const pathname = usePathname()
    const isCurrentPage = pathname === `/board/${boardId}`;

    return (
        <li>
            <Link 
                href={`/board/${boardId}`} 
                aria-label={boardTitle}
                className={`
                    ${isCurrentPage ? 'text-primary' : 'text-white hover:text-primary'} 
                    whitespace-nowrap overflow-ellipsis block overflow-x-hidden
                `}>
                {boardTitle}
            </Link>
        </li>
    );
}
