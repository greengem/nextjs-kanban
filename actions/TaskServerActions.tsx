'use server';
import prisma from '@/db/prisma';
import { auth } from "@/auth";
import { revalidatePath } from 'next/cache'
import { CreateTaskSchema, EditTaskSchema, DeleteTaskSchema } from '@/types/zodTypes';
import { TaskCreationData, TaskEditData, TaskDeletionData } from '@/types/types';


// Create Task
export async function handleCreateTask(data: TaskCreationData) {
    try {
        const session = await auth();
        const userId = session?.user?.id;
        const parse = CreateTaskSchema.safeParse(data);

        if (!parse.success) {
            return { success: false, message: 'Failed to create task' };
        }

        const maxOrderTask = await prisma.task.findFirst({
            where: { columnId: parse.data.columnId },
            orderBy: { order: 'desc' },
            select: { order: true },
        });

        const newOrder = (maxOrderTask?.order || 0) + 1;

        const createdTask = await prisma.task.create({
            data: {
                title: parse.data.title,
                description: parse.data.description,
                columnId: parse.data.columnId,
                order: newOrder,
            }
        });

        // Add activity logging
        if (createdTask && userId) {
            const activity = await prisma.activity.create({
                data: {
                    type: 'TASK_CREATED',
                    userId: userId,
                    taskId: createdTask.id,
                    boardId: parse.data.boardId,
                    originalColumnId: parse.data.columnId
                }
            });
        }

        revalidatePath(`/board/${parse.data.boardId}`);

        return { success: true, message: `Added task` };
    } catch (e) {
        return { success: false, message: `Failed to create task` };
    } finally {
    }
}


// EDIT TASK
export async function handleEditTask(data: TaskEditData) {
    
    const parse = EditTaskSchema.safeParse(data);

    if (!parse.success) {
        return { success: false, message: 'Failed to edit task' };
    }

    try {
        await prisma.task.update({
            where: {
                id: parse.data.id
            },
            data: {
                title: parse.data.title,
                description: parse.data.description,
            }
        });

        
        revalidatePath(`/board/${parse.data.boardId}`);
        //revalidatePath(`/task/${parse.data.id}`);

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


// Add a due date. NOTE: we expect a string since server actions need to be serialised
export async function handleAddDueDate(data: { taskId: string; dueDate: string; boardId: string; }) {
    const session = await auth();
    const userId = session?.user?.id;

    if (!data.boardId || !data.taskId || !data.dueDate || !userId) {
        return { success: false, message: 'Board ID, Task ID, Due Date, or User ID is missing' };
    }

    try {
        const dueDateObject = new Date(data.dueDate);

        const existingTask = await prisma.task.findUnique({
            where: { id: data.taskId },
            select: { dueDate: true }
        });

        await prisma.task.update({
            where: { id: data.taskId },
            data: { dueDate: dueDateObject },
        });

        // Determine the activity type
        const activityType = existingTask && existingTask.dueDate ? 'DUE_DATE_UPDATED' : 'DUE_DATE_ADDED';

        // Create an activity record
        await prisma.activity.create({
            data: {
                type: activityType,
                taskId: data.taskId,
                userId: userId,
            }
        });

        revalidatePath(`/board/${data.boardId}`);
        return { success: true, message: 'Due Date Updated' };
    } catch (e) {
        console.error(e);
        return { success: false, message: 'Failed to Update Due Date' };
    }
}



// Remove a due date.
export async function handleRemoveDueDate(data: { taskId: string; boardId: string; }) {
    const session = await auth();
    const userId = session?.user?.id;
    
    if (!data.boardId || !data.taskId || !userId) {
        return { success: false, message: 'Board ID, Task ID, or User ID is missing' };
    }

    try {
        await prisma.task.update({
            where: { id: data.taskId },
            data: { dueDate: null },
        });

        // Create an activity record for removing the due date
        await prisma.activity.create({
            data: {
                type: 'DUE_DATE_REMOVED',
                taskId: data.taskId,
                userId: userId,
            }
        });

        revalidatePath(`/board/${data.boardId}`);
        return { success: true, message: 'Due Date Removed' };
    } catch (e) {
        console.error(e);
        return { success: false, message: 'Failed to Remove Due Date' };
    }
}
