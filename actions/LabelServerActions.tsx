'use server';
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
