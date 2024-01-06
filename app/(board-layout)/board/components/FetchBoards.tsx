import { getBoardsSummary } from "@/lib/FetchData";
import { BoardSummary } from "@/types/types";
import Link from "next/link";
import { IconList, IconStarFilled  } from "@tabler/icons-react";

export default async function FetchBoards() {
    const boards: BoardSummary[] = await getBoardsSummary();

    return (
        <>
            {boards.map((board) => (
                <Link key={board.id} href={`/board/${board.id}`}>
                    <div className="h-28 flex flex-col justify-end relative rounded-xl shadow-lg bg-white hover:bg-zinc-100">
                        {board.isFavorited && (
                            <span className="absolute text-xs top-2 left-2 text-primary bg-white p-1 rounded-md">
                                <IconStarFilled size={16} />
                            </span>
                        )}
                        <span className="absolute text-xs top-2 right-2 flex items-center justify-center text-primary gap-1 bg-white p-1 rounded-md">
                            <IconList size={16} /><span>{board.tasksCount}</span>
                        </span>
                        
                        <p className="drop-shadow-lg p-2 whitespace-nowrap overflow-ellipsis block overflow-x-hidden">{board.title}</p>
                    </div>
                </Link>
            ))}
        </>  
    )
}