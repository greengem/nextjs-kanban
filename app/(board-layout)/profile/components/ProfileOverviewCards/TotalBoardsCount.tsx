import { auth } from "@/auth";
import prisma from '@/db/prisma';

export default async function TotalBoardsCount() {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        throw new Error("User not authenticated");
    }

    const totalBoards = await prisma.boardMember.count({
        where: {
            userId: userId,
        },
    });    

    return totalBoards;
}
