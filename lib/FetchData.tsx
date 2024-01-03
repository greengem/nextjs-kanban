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


export async function getBoard(id: string, userId: string, labelIdFilters?: string[]) {
    const labelCondition = labelIdFilters && labelIdFilters.length > 0 ? {
        labels: {
            some: {
                id: {
                    in: labelIdFilters,
                },
            },
        },
    } : {};

    const board = await prisma.board.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            title: true,
            backgroundUrl: true,
            favoritedBy: {
                where: {
                    userId: userId,
                },
                select: {
                    userId: true,
                },
            },
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
                        where: labelCondition,
                        select: {
                            id: true,
                            title: true,
                            description: true,
                            order: true,
                            columnId: true,
                            startDate: true,
                            dueDate: true,
                            labels: {
                                select: {
                                    id: true,
                                    title: true,
                                    color: true
                                }
                            },
                        },
                    },
                },
            },
        },
    });

    if (board) {
        const uniqueLabelsMap = new Map();
        board.columns.forEach(column => {
            column.tasks.forEach(task => {
                task.labels.forEach(label => {
                    uniqueLabelsMap.set(label.id, label);
                });
            });
        });
        const uniqueLabels = Array.from(uniqueLabelsMap.values());

        return {
            ...board,
            isFavorited: board.favoritedBy.length > 0,
            tasksCount: board.columns.reduce((sum, column) => sum + column.tasks.length, 0),
            columns: board.columns.map(column => ({
                ...column,
                tasks: column.tasks
            })),
            uniqueLabels,
        };
    }

    return null;
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


// Fetch Activity
export async function getUserActivity() {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return [];
    }

    const activities = await prisma.activity.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            createdAt: 'desc',
        },
        take: 5,
        include: {
            user: true,
            task: {
                select: {
                    title: true,
                },
            },
            board: true,
            oldColumn: true,
            newColumn: true,
            originalColumn: true,
        },
    });

    return activities;
}


// Get favorite boards
export async function getFavoriteBoards() {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return [];
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

    return favoriteBoards.map(favorite => favorite.board);
}
