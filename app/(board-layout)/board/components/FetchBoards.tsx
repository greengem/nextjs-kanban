import { getBoardsSummary } from "@/lib/FetchData";
import { BoardSummary } from "@/types/types";
import Link from "next/link";
import Image from "next/image";
import { IconList, IconStarFilled  } from "@tabler/icons-react";

export default async function FetchBoards() {
    const boards: BoardSummary[] = await getBoardsSummary();

    return (
        <>
            {boards.map((board) => (
                <Link key={board.id} href={`/board/${board.id}`}>
                    <div className="h-32 flex flex-col justify-end relative rounded-xl shadow-lg bg-white hover:bg-zinc-100 relative overflow-hidden">
                        <div className="absolute top-0 bottom-0 left-0 right-0 bg-white/50 z-10"></div>
                        {board.backgroundUrl && (
                            <Image 
                                className='object-cover object-center z-0'
                                src={board.backgroundUrl} 
                                alt='Board Wallpaper' 
                                fill
                            />
                        )}

                        {board.isFavorited && (
                            <span className="absolute text-xs top-2 left-2 text-primary bg-white p-1 rounded-md z-20">
                                <IconStarFilled size={16} />
                            </span>
                        )}

                        <span 
                            className="
                                absolute top-2 right-2 
                                flex items-center justify-center gap-1
                                text-xs text-primary bg-white
                                p-1 rounded-md z-20
                            "
                        >
                            <IconList size={16} /><span>{board.tasksCount}</span>
                        </span>
                        
                        <h4 className="
                            text-black font-semibold
                            z-20
                            drop-shadow-lg 
                            p-2 
                            overflow-ellipsis overflow-x-hidden whitespace-nowrap block
                            "
                        >{board.title}</h4>

                    </div>
                </Link>
            ))}
        </>  
    )
}