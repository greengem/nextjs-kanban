'use server';
import { z } from 'zod'
import prisma from '@/db/prisma';
import { revalidatePath } from 'next/cache'

// CREATE TASK
export async function handleCreateTask(prevState: any, formData: FormData) {
    const CreateTaskSchema = z.object({
        taskTitle: z.string().min(1), 
        taskDescription: z.union([z.string(), z.null()]).optional(),
        taskPriority: z.union([z.string(), z.null()]).optional(),
        columnId: z.string().min(1),
        boardId: z.string().min(1),
    });

    const parse = CreateTaskSchema.safeParse({
        taskTitle: formData.get('taskTitle') as string,
        taskDescription: formData.get('taskDescription') as string | null,
        taskPriority: formData.get('taskPriority') as string | null,
        columnId: formData.get('columnId') as string,
        boardId: formData.get('boardId') as string,
    });

    if (!parse.success) {
        return { success: false, message: 'Failed to create task' };
    }

    const data = parse.data;

    try {
        const maxOrderTask = await prisma.task.findFirst({
            where: { columnId: data.columnId },
            orderBy: { order: 'desc' },
            select: { order: true },
        });
        const newOrder = (maxOrderTask?.order || 0) + 1;

        await prisma.task.create({
            data: {
                title: data.taskTitle,
                description: data.taskDescription,
                priority: data.taskPriority,
                columnId: data.columnId,
                order: newOrder,
            }
        });

        revalidatePath(`/board/${data.boardId}`);
        return { success: true, message: `Added task ${data.taskTitle}` };
    } catch (e) {
        return { success: false, message: `Failed to create task` };
    }
}


// EDIT TASK
export async function handleEditTask(prevState: any, formData: FormData) {
    const EditTaskSchema = z.object({
        taskId: z.string().min(1),
        taskTitle: z.string().min(1), 
        taskDescription: z.union([z.string(), z.null()]).optional(),
        taskPriority: z.union([z.string(), z.null()]).optional(),
        boardId: z.string().min(1),
    });

    const parse = EditTaskSchema.safeParse({
        taskId: formData.get('taskId') as string,
        taskTitle: formData.get('taskTitle') as string,
        taskDescription: formData.get('taskDescription') as string | null,
        taskPriority: formData.get('taskPriority') as string | null,
        boardId: formData.get('boardId') as string,
    });

    if (!parse.success) {
        return { success: false, message: 'Failed to edit task' };
    }

    const data = parse.data;

    try {
        const updatedTask = await prisma.task.update({
            where: {
                id: data.taskId
            },
            data: {
                title: data.taskTitle,
                description: data.taskDescription,
                priority: data.taskPriority,
            }
        });

        
        revalidatePath(`/board/${data.boardId}`);
        return { success: true, message: `Edited task sucessfully!` };
    } catch (e) {
        return { success: false, message: `Failed to edit task` };
    }
}


// DELETE TASK
export async function handleDeleteTask(prevState: any, formData: FormData) {
    const DeleteTaskSchema = z.object({
        taskId: z.string().min(1),
        columnId: z.string().min(1),
        boardId: z.string().min(1),
    });

    const parse = DeleteTaskSchema.safeParse({
        taskId: formData.get('taskId') as string,
        columnId: formData.get('columnId') as string,
        boardId: formData.get('boardId') as string,
    });

    if (!parse.success) {
        return { success: false, message: 'Failed to delete task' };
    }

    const data = parse.data;

    try {
        const deletedTask = await prisma.task.delete({
            where: { id: data.taskId },
            select: { order: true }
        });

        if (deletedTask) {
            await prisma.task.updateMany({
                where: {
                    columnId: data.columnId,
                    order: { gt: deletedTask.order }
                },
                data: {
                    order: { decrement: 1 }
                }
            });
        }

        revalidatePath(`/board/${data.boardId}`);
        return { success: true, message: `Deleted task` };
    } catch (e) {
        return { success: false, message: 'Failed to delete task' };
    }
}
