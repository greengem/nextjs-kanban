import { BoardMember, Board } from "@prisma/client";
import { auth } from "@/auth";
import prisma from '@/db/prisma';
import Link from "next/link";
import Image from "next/image";

type BoardWithDetails = BoardMember & {
    board: Pick<Board, 'id' | 'title' | 'backgroundUrl'>;
};

export default async function FetchBoards() {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        return [];
    }

    const boards: BoardWithDetails[] = await prisma.boardMember.findMany({
        where: {
            userId: userId,
        },
        include: {
            board: {
                select: {
                    id: true,
                    title: true,
                    backgroundUrl: true,
                }
            }
        },
        orderBy: {
            createdAt: 'asc',
        }
    });

    return (
        <>
            {boards.map((boardMember) => (
                <Link key={boardMember.board.id} href={`/board/${boardMember.board.id}`}>
                    <div className="h-32 flex flex-col justify-end relative rounded-xl shadow-lg bg-white hover:bg-zinc-100 relative overflow-hidden">
                        <div className="absolute top-0 bottom-0 left-0 right-0 bg-white/40 backdrop-blur-md z-10"></div>
                        {boardMember.board.backgroundUrl && (
                            <Image 
                                className='object-cover object-center z-0'
                                src={boardMember.board.backgroundUrl} 
                                alt='Board Wallpaper' 
                                fill
                            />
                        )}
                        <h4 className="
                            text-black font-semibold tracking-tight
                            z-20
                            drop-shadow-lg 
                            p-2 
                            overflow-ellipsis overflow-x-hidden whitespace-nowrap block
                            "
                        >{boardMember.board.title}</h4>

                    </div>
                </Link>
            ))}
        </>  
    );
}
