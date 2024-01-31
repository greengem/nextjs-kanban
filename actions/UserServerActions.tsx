'use server';
import prisma from '@/db/prisma';
import { auth } from "@/auth";
import { revalidatePath } from 'next/cache'

export async function handleFavoriteBoard(boardId: string) {
    try {
        const session = await auth();
        const userId = session?.user?.id;

        if (!userId) {
            return { success: false, message: 'Authentication required', status: 401 };
        }

        const favorite = await prisma.favoriteBoard.findUnique({
            where: {
                userId_boardId: { userId, boardId },
            },
        });

        if (favorite) {
            await prisma.favoriteBoard.delete({
                where: {
                    userId_boardId: { userId, boardId },
                },
            });

            revalidatePath(`/board/${boardId}`);
            
            return { success: true, favorited: false, message: 'Board unfavorited', status: 200 };
        } else {
            await prisma.favoriteBoard.create({
                data: {
                    userId,
                    boardId,
                },
            });

            revalidatePath(`/board/${boardId}`);

            return { success: true, favorited: true, message: 'Board favorited', status: 200 };
        }
    } catch (error) {
        console.error('Error in handleFavoriteBoard:', error);
        return { success: false, message: 'An error occurred', status: 500 };
    }
}


export async function handleDeleteAccount() {
    try {
        const session = await auth();
        const userId = session?.user?.id;

        if (!userId) {
            return { success: false, message: 'Authentication required', status: 401 };
        }

        await prisma.$transaction(async (prisma: any) => {
            await prisma.user.delete({
                where: { id: userId },
            });
        });

        return { success: true, message: 'Account and all data successfully deleted', status: 200 };
    } catch (error) {
        console.error('Failed to delete user:', error);
        return { success: false, message: 'Error deleting account. Please try again later', status: 500 };
    }
}