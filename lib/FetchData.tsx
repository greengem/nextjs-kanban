// @ts-nocheck
import prisma from '@/db/prisma';
import { auth } from "@/auth";
import { BoardSummary } from '@/types/types';

export async function getBoardsSummary(): Promise<BoardSummary[]> {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        return [];
    }

    const boardMemberships = await prisma.boardMember.findMany({
        where: {
            userId: userId,
        },
        include: {
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
                    favoritedBy: {
                        where: {
                            userId: userId,
                        },
                        select: {
                            userId: true,
                        },
                    },
                }
            }
        },
        orderBy: {
            createdAt: 'asc',
        }
    });

    return boardMemberships.map(({ board }) => ({
        ...board,
        tasksCount: board.columns.reduce((sum, column) => sum + column.tasks.length, 0),
        isFavorited: board.favoritedBy.length > 0
    }));
}



// Fetch labels
export async function getLabelsForBoard(boardId: string) {
    const labels = await prisma.label.findMany({
        where: {
            boardId: boardId,
        },
        select: {
            id: true,
            title: true,
            color: true,
            isDefault: true,
        }
    });

    return labels;
}
