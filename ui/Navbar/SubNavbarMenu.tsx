'use client'
import { usePathname } from 'next/navigation'
import Link from "next/link";

interface Board {
    id: string;
    title: string;
}

export default function SubNavbarMenu({ boards }: { boards: Board[] }) {
    const pathname = usePathname();

    return (
        <ul className="flex items-center text-xs space-x-3  overflow-x-scroll no-scrollbar text-white">
            <li 
                className={`px-3 py-1  flex-none rounded-xl bg-blue-300 ${pathname === '/board' ? 'bg-blue-500' : ''}`}
            >
                <Link href='/board'>
                    All Boards
                </Link>
            </li>
            {boards.map((board) => (
                <li 
                    key={board.id} 
                    className={`px-3 py-1 rounded-xl flex-none bg-blue-300 ${pathname === `/board/${board.id}` ? 'bg-blue-500' : ''}`}
                >
                    <Link href={`/board/${board.id}`}>
                        {board.title}
                    </Link>
                </li>
            ))}
        </ul>
    )
}
