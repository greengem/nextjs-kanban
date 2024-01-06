import { auth } from "@/auth";
import prisma from '@/db/prisma';
import Link from "next/link";

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
                },
            },
        },
    });

    const boards = favoriteBoards.map(fav => fav.board);

    return (
        <>
            {boards.map((board) => (
                <Link key={board.id} href={`/board/${board.id}`}>
                    <div className="h-28 flex flex-col justify-end relative bg-white hover:bg-zinc-300 border-2 border-primary shadow-xl rounded-xl p-2">
                        <span className="whitespace-nowrap overflow-ellipsis block overflow-x-hidden">{board.title}</span>
                    </div>
                </Link>
            ))}
        </>
    )
}
