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
    });    

    const parse = CreateTaskSchema.safeParse({
        taskTitle: formData.get('taskTitle') as string,
        taskDescription: formData.get('taskDescription') as string | null,
        taskPriority: formData.get('taskPriority') as string | null,
        columnId: formData.get('columnId') as string,
    })

    if (!parse.success) {
        return { message: 'Failed to create task' }
    }

    const data = parse.data

    try {
        await prisma.task.create({
            data: {
                title: data.taskTitle,
                description: data.taskDescription,
                priority: data.taskPriority,
                columnId: data.columnId,
            }
        });
        
        const boardId = formData.get('boardId') as string;
        revalidatePath(`/board/${boardId}`);
        return { message: `Added task ${data.taskTitle}`}
    } catch (e) {
        return { message: `Failed to create task`}
    }
}

// EDIT TASK
export async function handleEditTask(prevState: any, formData: FormData) {
    const EditTaskSchema = z.object({
        taskId: z.string().min(1),
        taskTitle: z.string().min(1), 
        taskDescription: z.union([z.string(), z.null()]).optional(),
        taskPriority: z.union([z.string(), z.null()]).optional(),
    });

    const parse = EditTaskSchema.safeParse({
        taskId: formData.get('taskId') as string,
        taskTitle: formData.get('taskTitle') as string,
        taskDescription: formData.get('taskDescription') as string | null,
        taskPriority: formData.get('taskPriority') as string | null,
    });

    if (!parse.success) {
        return { message: 'Failed to edit task' };
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

        const boardId = formData.get('boardId') as string;
        revalidatePath(`/board/${boardId}`);
        return { message: `Edited task ${data.taskTitle}` };
    } catch (e) {
        return { message: `Failed to edit task` };
    }
}


// DELETE TASK
export async function handleDeleteTask(prevState: any, formData: FormData) {

    const DeleteTaskSchema = z.object({
        taskId: z.string().min(1),
        boardId: z.string().min(1),
    });

    const data = DeleteTaskSchema.parse({
        taskId: formData.get('taskId') as string,
        boardId: formData.get('boardId') as string,
    })

    try {
        await prisma.task.delete({
            where: {
                id: data.taskId,
            }
        });

        revalidatePath(`/board/${data.boardId}`);

        return { 
            success: true,
            message: `Deleted task`,
        }
    } catch (e) {
        return { 
            success: false,
            message: 'Failed to delete task'
        }
    }
}
