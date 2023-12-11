'use server';
import prisma from '@/db/prisma';
import { auth } from "@/auth";
import { revalidatePath } from 'next/cache'
import { CreateTaskSchema, EditTaskSchema, DeleteTaskSchema } from '@/types/zodTypes';
import { TaskCreationData, TaskEditData, TaskDeletionData } from '@/types/types';

// Create Task
export async function handleCreateTask(data: TaskCreationData) {
    const session = await auth();
    const userId = session?.user?.id;
    const parse = CreateTaskSchema.safeParse(data);

    if (!parse.success) {
        return { success: false, message: 'Failed to create task' };
    }

    try {
        const maxOrderTask = await prisma.task.findFirst({
            where: { columnId: parse.data.columnId },
            orderBy: { order: 'desc' },
            select: { order: true },
        });
        const newOrder = (maxOrderTask?.order || 0) + 1;

        // Store the result of task creation
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
            await prisma.activity.create({
                data: {
                    type: 'TASK_CREATED',
                    content: `added this card to`,
                    userId: userId,
                    taskId: createdTask.id,
                    boardId: parse.data.boardId
                }
            });
        }

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

        return { success: true, message: `Edited task sucessfully!` };
    } catch (e) {
        return { success: false, message: `Failed to edit task` };
    }
}


// DELETE TASK
export async function handleDeleteTask(data: TaskDeletionData) {
    console.log('handleDeleteTask called with data:', data);

    const parse = DeleteTaskSchema.safeParse(data);
    console.log('Validation result:', parse);

    if (!parse.success) {
        console.log('Validation failed');
        return { success: false, message: 'Failed to delete task due to validation error' };
    }

    try {
        console.log('Deleting task with id:', parse.data.id);
        const deletedTask = await prisma.task.delete({
            where: { id: parse.data.id },
            select: { order: true }
        });

        console.log('Deleted task:', deletedTask);

        if (deletedTask) {
            console.log('Updating task order for columnId:', parse.data.columnId);
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

        console.log('Revalidating path for boardId:', parse.data.boardId);
        revalidatePath(`/board/${parse.data.boardId}`);
        return { success: true, message: `Deleted task` };
    } catch (e) {
        console.error('Error in handleDeleteTask:', e);
        return { success: false, message: 'Failed to delete task' };
    }
}
