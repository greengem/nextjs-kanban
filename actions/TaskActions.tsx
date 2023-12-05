'use server';
import prisma from '@/db/prisma';
import { revalidatePath } from 'next/cache'
import { CreateTaskSchema, EditTaskSchema, DeleteTaskSchema } from '@/types/zodTypes';
import { TaskCreationData, TaskEditData, TaskDeletionData } from '@/types/types';

// Create Task
export async function handleCreateTask(data: TaskCreationData) {

    const parse = CreateTaskSchema.safeParse(data);

    if (!parse.success) {
        return { success: false, message: 'Failed to create task' };
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
        const maxOrderTask = await prisma.task.findFirst({
            where: { columnId: parse.data.columnId },
            orderBy: { order: 'desc' },
            select: { order: true },
        });
        const newOrder = (maxOrderTask?.order || 0) + 1;

        await prisma.task.create({
            data: {
                title: parse.data.title,
                description: parse.data.description,
                priority: parse.data.priority,
                columnId: parse.data.columnId,
                order: newOrder,
            }
        });

        revalidatePath(`/board/${parse.data.boardId}`);

        return { success: true, message: `Added task` };
    } catch (e) {
        return { success: false, message: `Failed to create task` };
    }
}


// EDIT TASK
export async function handleEditTask(data: TaskEditData) {
    
    const parse = EditTaskSchema.safeParse(data);

    if (!parse.success) {
        return { success: false, message: 'Failed to edit task' };
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
        await prisma.task.update({
            where: {
                id: parse.data.id
            },
            data: {
                title: parse.data.title,
                description: parse.data.description,
                priority: parse.data.priority,
            }
        });

        
        revalidatePath(`/board/${parse.data.boardId}`);

        return { success: true, message: `Edited task sucessfully!` };
    } catch (e) {
        return { success: false, message: `Failed to edit task` };
    }
}


// DELETE TASK
export async function handleDeleteTask(data: TaskDeletionData) {

    const parse = DeleteTaskSchema.safeParse(data);

    if (!parse.success) {
        return { success: false, message: 'Failed to delete task due to validation error' };
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
        const deletedTask = await prisma.task.delete({
            where: { id: parse.data.id },
            select: { order: true }
        });

        if (deletedTask) {
            await prisma.task.updateMany({
                where: {
                    columnId: parse.data.columnId,
                    order: { gt: deletedTask.order }
                },
                data: {
                    order: { decrement: 1 }
                }
            });
        }

        revalidatePath(`/board/${parse.data.boardId}`);
        return { success: true, message: `Deleted task` };
    } catch (e) {
        return { success: false, message: 'Failed to delete task' };
    }
}
