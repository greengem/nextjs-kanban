'use server';
import { z } from 'zod'
import prisma from '@/db/prisma';
import { revalidatePath } from 'next/cache'


// CREATE COLUMN
export async function handleCreateColumn(prevState: any, formData: FormData) {
    const CreateColumnSchema = z.object({
        boardId: z.string().min(1),
        columnTitle: z.string().min(1),
    });

    const parse = CreateColumnSchema.safeParse({
        boardId: formData.get('boardId') as string,
        columnTitle: formData.get('columnTitle') as string,
    });

    if (!parse.success) {
        return { success: false, message: 'Failed to create column' };
    }

    const data = parse.data;

    try {
        const maxOrderColumn = await prisma.column.findFirst({
            where: { boardId: data.boardId },
            orderBy: { order: 'desc' },
            select: { order: true },
        });
        const newOrder = (maxOrderColumn?.order || 0) + 1;

        await prisma.column.create({
            data: {
                title: data.columnTitle,
                boardId: data.boardId,
                order: newOrder,
            }
        });

        revalidatePath(`/board/${data.boardId}`);
        return { success: true, message: `Added column ${data.columnTitle}` };
    } catch (e) {
        return { success: false, message: `Failed to create column` };
    }
}


// DELETE COLUMN
export async function handleDeleteColumn(prevState: any, formData: FormData) {
    const DeleteColumnSchema = z.object({
        columnId: z.string().min(1),
        boardId: z.string().min(1),
    });

    const parse = DeleteColumnSchema.safeParse({
        columnId: formData.get('columnId') as string,
        boardId: formData.get('boardId') as string,
    });

    if (!parse.success) {
        return { success: false, message: 'Failed to delete column' };
    }

    const data = parse.data;

    try {
        const deletedColumn = await prisma.column.delete({
            where: { id: data.columnId },
            select: { order: true }
        });

        if (deletedColumn) {
            await prisma.column.updateMany({
                where: {
                    boardId: data.boardId,
                    order: { gt: deletedColumn.order }
                },
                data: {
                    order: { decrement: 1 }
                }
            });
        }

        revalidatePath(`/board/${data.boardId}`);
        return { success: true, message: `Deleted column` };
    } catch (e) {
        return { success: false, message: 'Failed to delete column' };
    }
}
