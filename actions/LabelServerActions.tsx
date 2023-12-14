'use server';
import prisma from '@/db/prisma';
import { revalidatePath } from 'next/cache';

export async function handleSaveLabel({ labelId, taskId, boardId }: { labelId: string; taskId: string, boardId: string }) {

    if (!labelId) {
        return { success: false, message: 'Label ID is missing' };
    }
    if (!taskId) {
        return { success: false, message: 'Task ID is missing' };
    }
    if (!boardId) {
        return { success: false, message: 'Board ID is missing' };
    }

    try {
        // Use upsert to either create a new association or update an existing one
        await prisma.labelOnTask.upsert({
            where: {
                labelId_taskId: { labelId, taskId }, // Unique composite key
            },
            update: {}, // No update needed, but required in upsert method
            create: { labelId, taskId }, // Create a new association
        });

        revalidatePath(`/board/${boardId}`);

        return { success: true, message: 'Label added to task' };
    } catch (e) {
        return { success: false, message: 'Failed to associate label with task' };
    }
}
