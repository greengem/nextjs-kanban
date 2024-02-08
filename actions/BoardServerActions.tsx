'use server';
import { auth } from "@/auth";
import prisma from '@/db/prisma';
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from 'next/cache';
import { CreateBoardSchema, EditBoardSchema } from '@/types/zodTypes';
import { BoardCreationData, BoardEditData } from "@/types/types";

// Define default label colors
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
    // Create the board
    const createdBoard = await prisma.board.create({
      data: {
        title: parse.data.title,
      }
    });

    await prisma.boardMember.create({
      data: {
        boardId: createdBoard.id,
        userId: session.user.id,
        role: 'owner',
      },
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
        title: null,
        boardId: boardId,
        isDefault: true,
        userId: userId,
      }
    });
  });

  await Promise.all(labelCreations);
}


// Edit Board
export async function handleEditBoard(data: BoardEditData) {
    
  const parse = EditBoardSchema.safeParse(data);

  if (!parse.success) {
      return { success: false, message: 'Failed to edit task' };
  }

  try {
      await prisma.board.update({
          where: {
              id: parse.data.id
          },
          data: {
              title: parse.data.title,
          }
      });
      
      revalidatePath(`/board/${parse.data.id}`);

      return { success: true, message: `Edited task sucessfully!` };
  } catch (e) {
      return { success: false, message: `Failed to edit task` };
  }
}


// Delete Board
export async function handleDeleteBoard(boardId: string) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, message: 'User is not authenticated' };
  }

  if (!boardId) {
    return { success: false, message: 'Board ID is missing' };
  }

  try {
    // Use prisma.$transaction without explicit type annotation
    await prisma.$transaction(async (tx) => {
      const owner = await tx.boardMember.findFirst({
        where: {
          boardId: boardId,
          userId: userId,
          role: 'owner',
        },
      });

      if (!owner) {
        throw new Error('Only board owners can delete the board');
      }

      // Perform deletion operations within the transaction
      await tx.boardMember.deleteMany({
        where: { boardId: boardId },
      });

      await tx.board.delete({
        where: { id: boardId },
      });
    });

    // Revalidate the path after successful deletion
    revalidatePath(`/board/`);

    return { success: true, message: 'Deleted board' };
  } catch (e) {
    const error = e as Error;
    return { success: false, message: error.message || 'Failed to delete board' };
  }
}





// Edit Background Image
export async function handleEditBoardImage(url: string, boardId: string) {
  if (!url) {
      return { success: false, message: 'No url provided' };
  }

  try {
      await prisma.board.update({
          where: {
              id: boardId,
          },
          data: {
              backgroundUrl: url,
          },
      });
      
      revalidatePath(`/board/${boardId}`);

      return { success: true, message: `Board image saved` };
  } catch (e) {
      console.error('Error updating board image:', e);
      return { success: false, message: `Failed to save board image` };
  }
}


// Set Background Image to Null
export async function handleRemoveBoardImage(boardId: string) {
  if (!boardId) {
    return { success: false, message: 'No board ID provided' };
  }

  try {
    await prisma.board.update({
      where: {
        id: boardId,
      },
      data: {
        backgroundUrl: null,
      },
    });
    
    revalidatePath(`/board/${boardId}`);

    return { success: true, message: 'Board image removed' };
  } catch (e) {
    return { success: false, message: 'Failed to remove board image' };
  }
}
