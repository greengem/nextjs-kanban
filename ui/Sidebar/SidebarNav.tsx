import Link from "next/link";
import { getBoardsSummary } from "@/lib/FetchData";
import { BoardSummary } from "@/types/types";

export default async function SidebarNav() {
    const boards: BoardSummary[] = await getBoardsSummary();

    return (
        <div className="px-5 pt-5">
            <h4 className="uppercase text-xs font-semibold text-zinc-500 mb-1">Boards</h4>
            <ul className="space-y-1 text-sm">
                {boards.map((board, index) => (
                    <li key={index}>
                        <Link 
                            href={`/board/${board.id}`} 
                            aria-label={board.title}
                            className="
                                text-white hover:text-primary    
                            ">
                            {board.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
