'use server';
import prisma from '@/db/prisma';
import { auth } from "@/auth";
import { revalidatePath } from 'next/cache'
import { CreateActivitySchema, DeleteActivitySchema } from '@/types/zodTypes';
import { ActivityCreationData, ActivityDeletionData } from '@/types/types';

// Create Activity
export async function handleCreateActivity(data: ActivityCreationData) {
    const session = await auth();
    const userId = session?.user?.id;

    // Check if user is authenticated
    if (!userId) {
        return { success: false, message: 'Authentication required' };
    }

    const parse = CreateActivitySchema.safeParse(data);

    if (!parse.success) {
        return { success: false, message: 'Failed to create activity' };
    }

    try {
        await prisma.activity.create({
            data: {
                type: 'COMMENT_ADDED',
                content: parse.data.content,
                userId: userId,
                taskId: parse.data.taskId,
                boardId: parse.data.boardId
            }
        });

        revalidatePath(`/board/${parse.data.boardId}`);

        return { success: true, message: 'Comment added successfully' };
    } catch (e) {
        return { success: false, message: 'Failed to create activity' };
    }
}


// Delete Activity
export async function handleDeleteActivity(data: { boardId: string; activityId: string; }) {

    if (!data.boardId || !data.activityId) {
        return { success: false, message: 'Board ID or Activity ID is missing' };
    }

    try {
        await prisma.activity.delete({
            where: { id: data.activityId },
        });

        revalidatePath(`/board/${data.boardId}`);
        return { success: true, message: 'Deleted activity' };
    } catch (e) {
        console.error('Error deleting activity:', e);
        return { success: false, message: 'Failed to delete activity' };
    }
}
