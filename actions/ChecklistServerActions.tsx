'use server';
import prisma from '@/db/prisma';
import { revalidatePath } from 'next/cache';

export async function handleCreateChecklistItem({ content, checklistId, boardId }: { content: string, checklistId: string, boardId: string }) {
    if (!checklistId) {
        return { success: false, message: 'Checklist ID is missing' };
    }
    if (!content) {
        return { success: false, message: 'Content is missing' };
    }

    try {
        const newItem = await prisma.checklistItem.create({
            data: {
                content: content,
                isChecked: false,
                checklistId: checklistId,
            },
        });

        revalidatePath(`/board/${boardId}`);

        return { success: true, message: 'Item added to checklist' };
    } catch (e) {
        return { success: false, message: 'Failed to add item to checklist' };
    }
}


export async function handleDeleteChecklistItem({ checklistItemId, boardId }: { checklistItemId: string, boardId: string }) {
    if (!checklistItemId) {
        return { success: false, message: 'Checklist item ID is missing' };
    }

    try {
        const deletedItem = await prisma.checklistItem.delete({
            where: {
                id: checklistItemId,
            },
        });

        revalidatePath(`/board/${boardId}`);

        return { success: true, message: 'Item deleted from checklist' };
    } catch (e) {
        return { success: false, message: 'Failed to delete item from checklist' };
    }
}