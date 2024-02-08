import { auth } from "@/auth";
import prisma from '@/db/prisma';
import Link from "next/link";
import Image from "next/image";
import { IconList } from "@tabler/icons-react";
import { BoardDetails, ColumnWithTasks } from "@/types/types";

type FavoriteBoard = {
    board: {
        id: string;
        title: string;
        backgroundUrl: string | null;
        columns: {
            tasks: { id: string }[];
        }[];
    };
};

export default async function ProfileBoards() {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        throw new Error("User not authenticated");
    }

    const favoriteBoards = await prisma.favoriteBoard.findMany({
        where: {
            userId: userId,
        },
        select: {
            board: {
                select: {
                    id: true,
                    title: true,
                    backgroundUrl: true,
                    columns: {
                        select: {
                            tasks: {
                                select: { id: true },
                            }
                        }
                    },
                },
            },
        },
    });

    const boards = favoriteBoards.map((fav: FavoriteBoard) => ({
        ...fav.board,
        tasksCount: fav.board.columns.reduce((sum: number, column) => sum + column.tasks.length, 0),
    }));

    if (boards.length === 0) {
        return <p>No favorite boards found.</p>;
    }

    return (
        <>
            {boards.map((board: BoardDetails) => (
                <Link key={board.id} href={`/board/${board.id}`}>
                <div className="h-32 flex flex-col justify-end relative rounded-xl shadow-lg bg-white hover:bg-zinc-100 relative overflow-hidden">
                    <div className="absolute top-0 bottom-0 left-0 right-0 bg-white/40 backdrop-blur-md z-10"></div>
                    {board.backgroundUrl && (
                        <Image 
                            className='object-cover object-center z-0'
                            src={board.backgroundUrl} 
                            alt='Board Wallpaper' 
                            fill
                        />
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
