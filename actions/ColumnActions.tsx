'use server';
import { z } from 'zod'
import prisma from '@/db/prisma';
import { revalidatePath } from 'next/cache'

export async function handleCreateColumn(prevState: any, formData: FormData) {
    const CreateColumnSchema = z.object({
        boardId: z.string().min(1),
        columnTitle: z.string().min(1),
    });

    const parse = CreateColumnSchema.safeParse({
        boardId: formData.get('boardId') as string,
        columnTitle: formData.get('columnTitle') as string,
    })

    if (!parse.success) {
        return { message: 'Failed to create column' }
    }

    const data = parse.data

    try {
        await prisma.column.create({
            data: {
                title: data.columnTitle,
                boardId: data.boardId,
            }
        });

        revalidatePath(`/board/${data.boardId}`);
        return { message: `Added board ${data.columnTitle}`}
    } catch (e) {
        return { message: `Failed to create column`}
    }
}

export async function handleDeleteColumn(prevState: any, formData: FormData) {

    const DeleteColumnSchema = z.object({
        columnId: z.string().min(1),
        columnTitle: z.string().min(1),
    });

    const data = DeleteColumnSchema.parse({
        columnId: formData.get('columnId') as string,
        columnTitle: formData.get('columnTitle') as string,
    })

    try {

        const column = await prisma.column.delete({
            where: {
                id: data.columnId,
            }
        });

        const boardId = formData.get('boardId') as string;
        revalidatePath(`/board/${boardId}`);
        return { message: `Deleted column ${data.columnTitle}` }
    } catch (e) {
        return { message: 'Failed to delete column' }
    }
}
