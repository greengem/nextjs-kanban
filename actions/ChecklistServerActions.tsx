'use server';
import prisma from '@/db/prisma';
import { revalidatePath } from 'next/cache';

export async function handleDeleteChecklist({ checklistId, boardId }: { checklistId: string, boardId: string }) {

    if (!checklistId) {
        return { success: false, message: 'Checklist ID is missing' };
    }

    try {
        await prisma.checklist.delete({
            where: {
                id: checklistId
            }
        });

        revalidatePath(`/board/${boardId}`);
        return { success: true, message: 'Deleted checklist' };
    } catch (e) {
        return { success: false, message: 'Failed to delete checklist', error: e };
    }
}


export async function handleCreateChecklist({ title, taskId, boardId }: { title?: string, taskId: string, boardId: string }) {
    if (!taskId) {
        return { success: false, message: 'Task ID is missing' };
    }

    try {
        await prisma.checklist.create({
            data: {
                title: title,
                taskId: taskId,
            },
        });

        revalidatePath(`/board/${boardId}`);

        return { success: true, message: 'Created checklist' };
    } catch (e) {
        console.error(e);
        return { success: false, message: 'Failed to create checklist' };
    }
}


export async function handleCreateChecklistItem({ content, checklistId, boardId }: { content: string, checklistId: string, boardId: string }) {
    if (!checklistId) {
        return { success: false, message: 'Checklist ID is missing' };
    }
    if (!content) {
        return { success: false, message: 'Content is missing' };
    }

    try {
        await prisma.checklistItem.create({
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
        await prisma.checklistItem.delete({
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


export async function handleToggleCheckedItem({ checklistItemId, isChecked, boardId }: { checklistItemId: string, isChecked: boolean, boardId: string }) {
    if (!checklistItemId) {
        return { success: false, message: 'Checklist item ID is missing' };
    }

    try {
        await prisma.checklistItem.update({
            where: { id: checklistItemId },
            data: { isChecked },
        });

        revalidatePath(`/board/${boardId}`);

        return { success: true, message: 'Checklist item toggled' };
    } catch (e) {
        console.error('Error toggling checklist item:', e);
        return { success: false, message: 'Failed to toggle checklist item' };
    }
}

