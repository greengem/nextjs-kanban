'use server';
import prisma from '@/db/prisma';
import { auth } from "@/auth";
import { revalidatePath } from 'next/cache'
import { CreateTaskSchema, EditTaskSchema, DeleteTaskSchema } from '@/types/zodTypes';
import { TaskCreationData, TaskEditData, TaskDeletionData } from '@/types/types';

// Create Task
export async function handleCreateTask(data: TaskCreationData) {
    console.log("handleCreateTask - start");

    try {
        const session = await auth();
        console.log("Session obtained:", session);

        const userId = session?.user?.id;
        console.log("User ID:", userId);

        const parse = CreateTaskSchema.safeParse(data);
        console.log("Data parse result:", parse);

        if (!parse.success) {
            console.error("Data parsing failed");
            return { success: false, message: 'Failed to create task' };
        }

        const maxOrderTask = await prisma.task.findFirst({
            where: { columnId: parse.data.columnId },
            orderBy: { order: 'desc' },
            select: { order: true },
        });
        console.log("Max order task:", maxOrderTask);

        const newOrder = (maxOrderTask?.order || 0) + 1;
        console.log("New order for task:", newOrder);

        // Store the result of task creation
        const createdTask = await prisma.task.create({
            data: {
                title: parse.data.title,
                description: parse.data.description,
                columnId: parse.data.columnId,
                order: newOrder,
            }
        });
        console.log("Created task:", createdTask);

        // Add activity logging
        if (createdTask && userId) {
            const activity = await prisma.activity.create({
                data: {
                    type: 'TASK_CREATED',
                    content: `added this card to`,
                    userId: userId,
                    taskId: createdTask.id,
                    boardId: parse.data.boardId
                }
            });
            console.log("Activity logged:", activity);
        }

        revalidatePath(`/board/${parse.data.boardId}`);
        console.log("Path revalidated");

        return { success: true, message: `Added task` };
    } catch (e) {
        console.error("Error in handleCreateTask:", e);
        return { success: false, message: `Failed to create task` };
    } finally {
        console.log("handleCreateTask - end");
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
