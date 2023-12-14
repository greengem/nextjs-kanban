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

        return { success: true, message: 'New Column Created' };
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

        return { success: true, message: `Column Updated` };
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

        return { success: true, message: `Column Removed` };
    } catch (e) {
        return { success: false, message: 'Failed to delete column' };
    }
}


// DELETE TASKS WITHIN A COLUMN
export async function handleDeleteColumnTasks({ columnId, boardId }: { columnId: string; boardId: string }) {
    if (!columnId) {
        return { success: false, message: 'Column ID is missing' };
    }
      
    try {
        // Delete all tasks associated with the columnId
        await prisma.task.deleteMany({
            where: { columnId: columnId },
        });

        revalidatePath(`/board/${boardId}`);

        return { success: true, message: `Tasks Deleted` };
    } catch (e) {
        return { success: false, message: 'Failed to Delete tasks in this column' };
    }
}
