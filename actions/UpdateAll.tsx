'use server';
import { z } from 'zod';
import prisma from '@/db/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from "@/auth";

// Define a Zod schema that matches the structure of your BoardDetails
const TaskSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    priority: z.string().nullable(),
    dueDate: z.date().nullable(),
    order: z.number(),
  });
  
  const ColumnSchema = z.object({
    id: z.string(),
    title: z.string(),
    order: z.number(),
    tasks: z.array(TaskSchema),
  });
  
  const BoardDataSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    columns: z.array(ColumnSchema),
  });
  

export async function handleUpdateBoard(prevState: any, formData: FormData) {
    const session = await auth();

    if (!session?.user?.id) {
        console.log('User is not authenticated');
        return { success: false, message: 'User is not authenticated' };
    }
    
    const boardDataStr = formData.get('boardData') as string;
    if (!boardDataStr) {
        console.log('No board data provided');
        return { success: false, message: 'No board data provided' };
    }

    console.log('Received board data:', boardDataStr);

    try {
        const boardData = JSON.parse(boardDataStr);
        const validationResult = BoardDataSchema.safeParse(boardData);

        if (!validationResult.success) {
            console.log('Validation failed:', validationResult.error);
            return { success: false, message: 'Validation failed' };
        }

        // Start a transaction
        const result = await prisma.$transaction(async (prisma) => {
            // Delete existing columns and tasks
            await prisma.task.deleteMany({ where: { column: { boardId: boardData.id } } });
            await prisma.column.deleteMany({ where: { boardId: boardData.id } });

            // Update the board and create new columns and tasks
            return prisma.board.update({
                where: { id: boardData.id },
                data: {
                    title: boardData.title,
                    description: boardData.description,
                    columns: {
                        create: boardData.columns.map(column => ({
                            title: column.title,
                            order: column.order,
                            tasks: {
                                create: column.tasks.map(task => ({
                                    title: task.title,
                                    description: task.description,
                                    priority: task.priority,
                                    dueDate: task.dueDate,
                                    order: task.order,
                                })),
                            },
                        })),
                    },
                },
            });
        });

        revalidatePath(`/board/`);
        return { success: true, message: `Board updated successfully` };
    } catch (e) {
        console.error('Error during update:', e);
        return { success: false, message: `Failed to update board` };
    }
}