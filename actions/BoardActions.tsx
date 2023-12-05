'use server';
import { z } from 'zod';
import prisma from '@/db/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from "@/auth";

interface BoardData {
  boardTitle: string;
  boardDescription?: string;
}

export async function handleCreateBoard(prevState: any, data: BoardData) {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, message: 'User is not authenticated' };
  }

  const CreateBoardSchema = z.object({
    boardTitle: z.string().min(1, "Title is required"),
    boardDescription: z.string().optional(),
  });

  const parse = CreateBoardSchema.safeParse(data);

  if (!parse.success) {
    return { success: false, message: 'Failed to create board due to validation error' };
  }

  try {
    const createdBoard = await prisma.board.create({
      data: {
        userId: session?.user?.id,
        title: parse.data.boardTitle,
        description: parse.data.boardDescription,
      }
    });

    revalidatePath('/board/');

    return { success: true, message: `Board Created`, boardId: createdBoard.id };
  } catch (e) {
    return { success: false, message: `Failed to create board` };
  }
}


export async function handleDeleteBoard(prevState: any, formData: FormData) {

    const DeleteBoardSchema = z.object({
        boardId: z.string().min(1),
        boardTitle: z.string().min(1),
    });

    const parse = DeleteBoardSchema.safeParse({
        boardId: formData.get('boardId') as string,
        boardTitle: formData.get('boardTitle') as string,
    })

    if (!parse.success) {
        return { success: false, message: 'Failed to delete task' };
    }

    const data = parse.data;

    try {

        const column = await prisma.board.delete({
            where: {
                id: data.boardId,
            }
        });

        revalidatePath(`/board/`);

        return { success: true, message: `Deleted board ${data.boardTitle}` }
    } catch (e) {
        return { success: false, message: 'Failed to delete board' }
    }
}
