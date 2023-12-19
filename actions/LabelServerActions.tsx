'use server';
import { auth } from "@/auth";
import prisma from '@/db/prisma';
import { revalidatePath } from 'next/cache';

export async function handleSaveLabel({ labelId, taskId, boardId }: { labelId: string; taskId: string, boardId: string }) {
    if (!labelId || !taskId) {
        return { success: false, message: 'Label ID or Task ID is missing' };
    }

    try {
        await prisma.task.update({
            where: { id: taskId },
            data: {
                labels: {
                    connect: { id: labelId },
                },
            },
        });

        revalidatePath(`/board/${boardId}`);

        return { success: true, message: 'Label added to task' };
    } catch (e) {
        console.error('Error adding label to task:', e);
        return { success: false, message: 'Failed to associate label with task' };
    }
}


export async function handleRemoveLabel({ labelId, taskId, boardId }: { labelId: string; taskId: string, boardId: string }) {
    if (!labelId || !taskId) {
        return { success: false, message: 'Label ID or Task ID is missing' };
    }

    try {
        await prisma.task.update({
            where: { id: taskId },
            data: {
                labels: {
                    disconnect: { id: labelId },
                },
            },
        });

        revalidatePath(`/board/${boardId}`);

        return { success: true, message: 'Label removed from task' };
    } catch (e) {
        console.error('Error removing label from task:', e);
        return { success: false, message: 'Failed to remove label from task' };
    }
}




export async function handleUpdateLabel({ labelId, color, title, boardId }: { labelId: string, color: string, title: string, boardId: string }) {
    if (!labelId || !color) {
        return { success: false, message: 'Label ID or Task ID is missing' };
    }

    try {
        await prisma.label.update({
            where: { id: labelId },
            data: {
                title: title,
                color: color
            },
        });

        revalidatePath(`/board/${boardId}`);

        return { success: true, message: 'Label updated' };
    } catch (e) {
        return { success: false, message: 'Failed to update label' };
    }
}


export async function handleCreateLabel({ color, title, boardId, taskId }: { color: string, title: string, boardId: string, taskId: string }) {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return { success: false, message: 'User not authenticated' };
    }

    if (!color) {
        return { success: false, message: 'Color is missing' };
    }

    try {
        const createdLabel = await prisma.label.create({
            data: {
                userId: userId,
                title: title,
                color: color,
                boardId: boardId
            },
        });

        if (taskId) {
            await prisma.task.update({
                where: { id: taskId },
                data: {
                    labels: {
                        connect: { id: createdLabel.id },
                    },
                },
            });
        }

        revalidatePath(`/board/${boardId}`);

        return { success: true, message: 'Label created and added to task', newLabelId: createdLabel.id };
    } catch (e) {
        console.error('Error creating label:', e);
        return { success: false, message: 'Failed to create label' };
    }
}




export async function handleDeleteLabel({ labelId, boardId }: { labelId: string, boardId: string }) {
    if (!labelId) {
        return { success: false, message: 'Label ID or Task ID is missing' };
    }

    try {
        await prisma.label.delete({
            where: { id: labelId },
        });

        revalidatePath(`/board/${boardId}`);

        return { success: true, message: 'Label removed' };
    } catch (e) {
        return { success: false, message: 'Failed to remove label' };
    }
}
