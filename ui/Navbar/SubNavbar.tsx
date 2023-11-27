import { getBoardsSummary } from "@/lib/FetchData";
import Link from "next/link";

export default async function SubNavbar () {
    const boards = await getBoardsSummary();
    return (
        <nav className="flex px-5 py-2 bg-blue-400 items-center justify-between">
            <ul className="flex items-center text-xs space-x-3 text-white overflow-x-scroll no-scrollbar">
                {boards.map((board) => (
                    <li key={board.id} className="px-3 py-1"><Link href={`/board/${board.id}`}>{board.title}</Link></li>
                ))}
            </ul>
        </nav>
    )
}
