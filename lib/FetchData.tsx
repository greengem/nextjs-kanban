import prisma from '@/db/prisma';
import { BoardSummary, BoardDetails } from '@/types/types';

// Get A list of boards without columns or tasks
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

// Get a board by ID
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
                select: {
                    id: true,
                    title: true,
                    tasks: {
                        select: {
                            id: true,
                            title: true,
                            description: true,
                            priority: true,
                            dueDate: true,
                            createdAt: true,
                            updatedAt: true,
                        },
                    },
                },
            },
        },
    });
    return board;
}
