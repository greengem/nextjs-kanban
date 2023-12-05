'use server';
import { auth } from "@/auth";
import prisma from '@/db/prisma';
import { revalidatePath } from 'next/cache';
import { CreateBoardSchema, DeleteBoardSchema } from '@/types/zodTypes';
import { BoardCreationData, BoardDeletionData } from "@/types/types";

// Create Board
export async function handleCreateBoard(data: BoardCreationData) {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, message: 'User is not authenticated' };
  }

  const parse = CreateBoardSchema.safeParse(data);

  if (!parse.success) {
    return { success: false, message: 'Failed to create board due to validation error' };
  }

  try {
    const createdBoard = await prisma.board.create({
      data: {
        userId: session?.user?.id,
        title: parse.data.title,
        description: parse.data.description,
      }
    });

    revalidatePath('/board/');

    return { success: true, message: `Board Created`, boardId: createdBoard.id };
  } catch (e) {
    return { success: false, message: `Failed to create board` };
  }
}

// Delete Board
export async function handleDeleteBoard(data: BoardDeletionData) {

    const parse = DeleteBoardSchema.safeParse(data);

    if (!parse.success) {
      return { success: false, message: 'Failed to delete board due to validation error' };
    }

    try {

        await prisma.board.delete({
            where: {
                id: parse.data.id,
            }
        });

        revalidatePath(`/board/`);

        return { success: true, message: `Deleted board` }
    } catch (e) {
        return { success: false, message: 'Failed to delete board' }
    }
}
