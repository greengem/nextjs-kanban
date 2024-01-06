import prisma from '@/db/prisma';
import { auth } from "@/auth";
import { BoardSummary } from '@/types/types';


export async function getBoardsSummary(): Promise<BoardSummary[]> {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        return [];
    }

    const boards = await prisma.board.findMany({
        where: {
            userId: userId
        },
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
        },
        orderBy: {
            createdAt: 'asc',
        }
    });

    return boards.map(board => ({
        ...board,
        tasksCount: board.columns.reduce((sum, column) => sum + column.tasks.length, 0),
        isFavorited: board.favoritedBy.length > 0
    }));
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
            startDate: true,
            createdAt: true,
            updatedAt: true,
            order: true,
            columnId: true,
            column: {
                select: {
                    title: true,
                    boardId: true,
                    board: {
                        select: {
                            backgroundUrl: true,
                        }
                    }
                },
            },
            labels: {
                select: {
                    id: true,
                    title: true,
                    color: true
                }
            },
            checklists: {
                select: {
                    id: true,
                    title: true,
                    items: {
                        orderBy: {
                            createdAt: 'asc'
                        },
                        select: {
                            id: true,
                            content: true,
                            isChecked: true,
                            createdAt: true
                        }
                    }
                }
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
                    startDate: true,
                    dueDate: true,
                    oldColumn: {
                        select: { title: true },
                    },
                    newColumn: {
                        select: { title: true },
                    },
                    originalColumn: {
                        select: { title: true },
                    },
                    task: {
                        select: {
                          title: true,
                        },
                      },
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
