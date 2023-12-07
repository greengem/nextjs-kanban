'use server';
import prisma from '@/db/prisma';
import { revalidatePath } from 'next/cache'
import { CreateColumnSchema , DeleteColumnSchema, EditColumnSchema } from '@/types/zodTypes';
import { ColumnCreationData, ColumnDeletionData } from '@/types/types';

// Create Column
export async function handleCreateColumn(data: ColumnCreationData) {

    const parse = CreateColumnSchema.safeParse(data);

    if (!parse.success) {
        return { success: false, message: 'Failed to create column due to validation error' };
    }

    try {
        const maxOrderColumn = await prisma.column.findFirst({
            where: { boardId: parse.data.boardId },
            orderBy: { order: 'desc' },
            select: { order: true },
        });
        const newOrder = (maxOrderColumn?.order || 0) + 1;

        await prisma.column.create({
            data: {
                title: parse.data.title,
                boardId: parse.data.boardId,
                order: newOrder,
            }
        });

        revalidatePath(`/board/${parse.data.boardId}`);

        return { success: true, message: 'Created column' };
    } catch (e) {
        return { success: false, message: `Failed to create column` };
    }
}


// EDIT TASK
export async function handleEditColumn(data: any) {
    
    const parse = EditColumnSchema.safeParse(data);

    if (!parse.success) {
        return { success: false, message: 'Failed to edit column' };
    }

    try {
        await prisma.column.update({
            where: {
                id: parse.data.columnId
            },
            data: {
                title: parse.data.title,
            }
        });

        
        revalidatePath(`/board/${parse.data.boardId}`);

        return { success: true, message: `Edited column sucessfully!` };
    } catch (e) {
        return { success: false, message: `Failed to edit column` };
    }
}


// DELETE COLUMN
export async function handleDeleteColumn(data: ColumnDeletionData) {

    const parse = DeleteColumnSchema.safeParse(data);

    if (!parse.success) {
        return { success: false, message: 'Failed to delete column due to validation error' };
    }

    try {
        const deletedColumn = await prisma.column.delete({
            where: { id: parse.data.id },
            select: { order: true }
        });

        if (deletedColumn) {
            await prisma.column.updateMany({
                where: {
                    boardId: parse.data.boardId,
                    order: { gt: deletedColumn.order }
                },
                data: {
                    order: { decrement: 1 }
                }
            });
        }

        revalidatePath(`/board/${parse.data.boardId}`);

        return { success: true, message: `Deleted column` };
    } catch (e) {
        return { success: false, message: 'Failed to delete column' };
    }
}
