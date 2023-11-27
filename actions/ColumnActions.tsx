'use server';
import { z } from 'zod'
import prisma from '@/db/prisma';
import { revalidatePath } from 'next/cache'

const CreateColumnSchema = z.object({
    boardId: z.string(),
    columnTitle: z.string(),
});

const DeleteColumnSchema = z.object({
    boardId: z.string(),
    columnId: z.string(),
});

export async function handleCreateColumn(formData: FormData) {
    const boardId = formData.get('boardId') as string;
    const columnTitle = formData.get('columnTitle') as string;

    const columnData = {
        boardId, columnTitle
    };

    try {
        const validatedData = CreateColumnSchema.parse(columnData);
        const column = await prisma.column.create({
            data: {
                title: validatedData.columnTitle,
                boardId: validatedData.boardId,
            }
        });
        
        revalidatePath(`/board/${boardId}`);

    } catch (error) {
        console.error(error);
    throw error;
    }
    
}

export async function handleDeleteColumn(formData: FormData) {
    const boardId = formData.get('boardId') as string;
    const columnId = formData.get('columnId') as string;

    const columnData = {
        boardId, columnId
    };

    try {
        const validatedData = DeleteColumnSchema.parse(columnData);

        const column = await prisma.column.delete({
            where: {
                id: validatedData.columnId,
            }
        });
        
        revalidatePath(`/board/${boardId}`);

    } catch (error) {
        console.error(error);
    throw error;
    }
    
}