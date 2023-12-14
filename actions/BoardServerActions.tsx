'use server';
import { auth } from "@/auth";
import prisma from '@/db/prisma';
import { revalidatePath } from 'next/cache';
import { CreateBoardSchema, DeleteBoardSchema } from '@/types/zodTypes';
import { BoardCreationData, BoardDeletionData } from "@/types/types";

// Create Board
const DEFAULT_LABEL_COLORS = ['green', 'yellow', 'orange', 'red', 'purple', 'blue'];

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
        userId: session.user.id,
        title: parse.data.title,
        description: parse.data.description,
      }
    });

    // Create default labels for the new board
    await createDefaultLabelsForBoard(createdBoard.id, session.user.id);

    revalidatePath('/board/');

    return { success: true, message: 'Board Created', boardId: createdBoard.id };
  } catch (e) {
    return { success: false, message: 'Failed to create board' };
  }
}

// Function to create default labels for a board
async function createDefaultLabelsForBoard(boardId: string, userId: string) {
  const labelCreations = DEFAULT_LABEL_COLORS.map(color => {
    return prisma.label.create({
      data: {
        color: color,
        name: '', // Empty name for default labels
        boardId: boardId,
        isDefault: true,
        userId: userId,
      }
    });
  });

  await Promise.all(labelCreations);
}



// Delete Board
export async function handleDeleteBoard(boardId: string) {


  if (!boardId) {
    return { success: false, message: 'Board ID is missing' };
}
    
    try {

        await prisma.board.delete({
          where: { id: boardId },
        });

        revalidatePath(`/board/`);

        return { success: true, message: `Deleted board` }
    } catch (e) {
        return { success: false, message: 'Failed to delete board' }
    }
}
