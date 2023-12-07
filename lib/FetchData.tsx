import prisma from '@/db/prisma';
import { auth } from "@/auth";
import { BoardSummary, BoardDetails } from '@/types/types';

export async function getBoardsSummary(): Promise<BoardSummary[]> {
    const session = await auth();

    const userId = session?.user?.id;
    if (!userId) {
        return [];
    }

    const boards = await prisma.board.findMany({
        where: {
            userId: session?.user?.id
        },
        select: {
            id: true,
            title: true,
            description: true,
            createdAt: true,
            updatedAt: true,
        },
        orderBy: {
            createdAt: 'asc',
        }
    });

    return boards;
}

export async function getBoard(id: string): Promise<BoardDetails | null> {
    const session = await auth();
    const board = await prisma.board.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            title: true,
            description: true,
            createdAt: true,
            updatedAt: true,
            columns: {
                orderBy: {
                    order: 'asc'
                },
                select: {
                    id: true,
                    title: true,
                    order: true,
                    createdAt: true,
                    updatedAt: true,
                    tasks: {
                        orderBy: {
                            order: 'asc'
                        },
                        select: {
                            id: true,
                            title: true,
                            description: true,
                            priority: true,
                            dueDate: true,
                            createdAt: true,
                            updatedAt: true,
                            order: true,
                            columnId: true,
                        },
                    },
                },
            },
        },
    });

    return board;
}
