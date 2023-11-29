import prisma from '@/db/prisma';
import { BoardSummary, BoardDetails } from '@/types/types';

export async function getBoardsSummary(): Promise<BoardSummary[]> {
    const boards = await prisma.board.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            createdAt: true,
            updatedAt: true,
        }
    });
    return boards;
}

export async function getBoard(id: string): Promise<BoardDetails | null> {
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
                        },
                    },
                },
            },
        },
    });
    return board;
}
