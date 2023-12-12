import prisma from '@/db/prisma';
import { auth } from "@/auth";
import { BoardSummary, BoardDetails } from '@/types/types';
import { Task } from '@prisma/client';

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
        },
        orderBy: {
            createdAt: 'asc',
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
            columns: {
                orderBy: {
                    order: 'asc'
                },
                select: {
                    id: true,
                    title: true,
                    order: true,
                    tasks: {
                        orderBy: {
                            order: 'asc'
                        },
                        select: {
                            id: true,
                            title: true,
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



export async function getTask(taskId: string) {
    const task = await prisma.task.findUnique({
        where: {
            id: taskId
        },
        select: {
            id: true,
            title: true,
            description: true,
            dueDate: true,
            createdAt: true,
            updatedAt: true,
            order: true,
            columnId: true,
            column: {
                select: {
                    title: true,
                    boardId: true,
                },
            },
            activities: {
                orderBy: {
                    createdAt: 'desc'
                },
                select: {
                    id: true,
                    type: true,
                    content: true,
                    createdAt: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                        }
                    },
                }
            }
        }
    });
    return task;
}
