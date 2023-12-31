'use client'
import { usePathname } from 'next/navigation'
import Link from "next/link";
import { IconFile } from '@tabler/icons-react';

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
                    ${isCurrentPage ? 'text-primary' : 'hover:text-primary'} 
                    whitespace-nowrap overflow-ellipsis overflow-x-hidden flex items-center gap-1
                `}>
                    <IconFile size={16} className='shrink-0' />
                    {boardTitle}
            </Link>
        </li>
    );
}
