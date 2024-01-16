'use server';
import prisma from '@/db/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod'

export async function handleDeleteChecklist({ checklistId, taskId }: { checklistId: string, taskId: string }) {

    if (!checklistId) {
        return { success: false, message: 'Checklist ID is missing' };
    }

    try {
        await prisma.checklist.delete({
            where: {
                id: checklistId
            }
        });

        revalidatePath(`/task/${taskId}`);
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


// Create a new checklist item
const handleCreateChecklistItemSchema = z.object({
    content: z.string().trim().min(1).max(300),
    checklistId: z.string(),
    taskId: z.string(),
});

export async function handleCreateChecklistItem(formData: FormData) {
    const validatedFields = handleCreateChecklistItemSchema.safeParse({
        content: formData.get('content')?.toString(),
        checklistId: formData.get('checklistId')?.toString(),
        taskId: formData.get('taskId')?.toString(),
    });

    if (!validatedFields.success) {
        const errorMessage = Object.values(validatedFields.error.flatten().fieldErrors).map(e => e.join(', ')).join('; ');
    
        return {
            success: false,
            message: `Validation failed: ${errorMessage}`,
        };
    }

    try {
        await prisma.checklistItem.create({
            data: {
                content: validatedFields.data.content,
                isChecked: false,
                checklistId: validatedFields.data.checklistId,
            },
        });

        revalidatePath(`/task/${validatedFields.data.taskId}`);

        return { success: true, message: 'Item added to checklist' };
    } catch (e) {
        return { success: false, message: 'Failed to add item to checklist' };
    }
}


// Delete a checklist item.
export async function handleDeleteChecklistItem({ checklistItemId, taskId }: { checklistItemId: string, taskId: string }) {
    await prisma.checklistItem.delete({
        where: {
            id: checklistItemId,
        },
    });
    revalidatePath(`/task/${taskId}`);
}


// Toggle a checklist item.
export async function handleToggleCheckedItem({ checklistItemId, isChecked, taskId }: { checklistItemId: string, isChecked: boolean, taskId: string }) {
    await prisma.checklistItem.update({
        where: { id: checklistItemId },
        data: { isChecked },
    });
    revalidatePath(`/task/${taskId}`);
}



const handleEditChecklistNameSchema = z.object({
    title: z.string().trim().min(1, "Title cannot be empty").max(30, "Title is too long"),
    checklistId: z.string(),
    taskId: z.string(),
});

export async function handleEditChecklistName(formData: FormData) {
    const validatedFields = handleEditChecklistNameSchema.safeParse({
        title: formData.get('title')?.toString(),
        checklistId: formData.get('checklistId')?.toString(),
        taskId: formData.get('taskId')?.toString(),
    });

    if (!validatedFields.success) {
        const errorMessage = Object.values(validatedFields.error.flatten().fieldErrors).map(e => e.join(', ')).join('; ');
    
        return {
            success: false,
            message: `Validation failed: ${errorMessage}`,
        };
    }

    try {
        await prisma.checklist.update({
            where: { id: validatedFields.data.checklistId },
            data: { title: validatedFields.data.title},
        });

        revalidatePath(`/task/${validatedFields.data.taskId}`);

        return { success: true, message: 'Checklist title updated' };
    } catch (e) {
        console.error(e);
        return { success: false, message: 'Failed to update checklist name' };
    }

}


const handleEditChecklistItemContentSchema = z.object({
    content: z.string().trim().min(1).max(100),
    checklistItemId: z.string(),
    taskId: z.string(),
});

export async function handleEditChecklistItemContent(formData: FormData) {
    const validatedFields = handleEditChecklistItemContentSchema.safeParse({
        content: formData.get('content')?.toString(),
        checklistItemId: formData.get('checklistItemId')?.toString(),
        taskId: formData.get('taskId')?.toString(),
    });

    if (!validatedFields.success) {
        const errorMessage = Object.values(validatedFields.error.flatten().fieldErrors).map(e => e.join(', ')).join('; ');
        return {
            success: false,
            message: `Validation failed: ${errorMessage}`,
        };
    }

    try {
        await prisma.checklistItem.update({
            where: { id: validatedFields.data.checklistItemId },
            data: { content: validatedFields.data.content },
        });

        revalidatePath(`/task/${validatedFields.data.taskId}`);

        return { success: true, message: 'Checklist item content updated' };
    } catch (e) {
        console.error(e);
        return { success: false, message: 'Failed to update checklist item content' };
    }
}
