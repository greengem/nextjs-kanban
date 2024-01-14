'use server';
import prisma from '@/db/prisma';
import { auth } from "@/auth";
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const handleCreateActivitySchema = z.object({
    content: z.string().trim().min(1, "Comment cannot be empty").max(500, "Comment is too long"),
});

// Create Activity
export async function handleCreateActivity( taskId: string, boardId: string, formData: FormData) {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return { success: false, message: 'Authentication required' };
    }

    const validatedFields = handleCreateActivitySchema.safeParse({
        content: formData.get('content')?.toString(),
    });

    if (!validatedFields.success) {
        const errorMessage = Object.values(validatedFields.error.flatten().fieldErrors).map(e => e.join(', ')).join('; ');
    
        return {
            success: false,
            message: `Validation failed: ${errorMessage}`,
        };
    }

    try {
        await prisma.activity.create({
            data: {
                type: 'COMMENT_ADDED',
                content: validatedFields.data.content,
                userId: userId,
                taskId: taskId,
                boardId: boardId
            }
        });

        revalidatePath(`/task/${taskId}`);

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
        return { success: false, message: 'Failed to delete activity' };
    }
}
