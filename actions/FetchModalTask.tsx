'use server';
import prisma from '@/db/prisma';

export async function handleFetchTask(taskId: string) {
    try {
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

        if (task) {
            return { success: true, task: task };
        } else {
            return { success: false, message: 'Task not found' };
        }
    } catch (e) {
        console.error('Error fetching task:', e);
        return { success: false, message: 'Failed to fetch task' };
    }
}
