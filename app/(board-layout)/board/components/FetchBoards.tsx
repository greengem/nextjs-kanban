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
                    <div className="h-32 flex flex-col justify-end rounded-xl shadow-lg bg-zinc-700 hover:bg-zinc-900 relative overflow-hidden">
                        <h4 className="
                            font-semibold tracking-tight
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
