'use server';
import { z } from 'zod'
import prisma from '@/db/prisma';
import { revalidatePath } from 'next/cache'

export async function handleCreateBoard(prevState: any, formData: FormData) {
    const CreateBoardSchema = z.object({
        boardTitle: z.string().min(1),
        boardDescription: z.string().optional(),
    });

    const parse = CreateBoardSchema.safeParse({
        boardTitle: formData.get('boardTitle') as string,
        boardDescription: formData.get('boardDescription') as string,
    })

    if (!parse.success) {
        return { message: 'Failed to create board' }
    }

    const data = parse.data

    try {
        await prisma.board.create({
            data: {
                title: data.boardTitle,
                description: data.boardDescription,
            }
        });

        revalidatePath(`/board/`);
        return { message: `Added board ${data.boardTitle}`}
    } catch (e) {
        return { message: `Failed to create board`}
    }
}

export async function handleDeleteBoard(prevState: any, formData: FormData) {

    const DeleteBoardSchema = z.object({
        boardId: z.string().min(1),
        boardTitle: z.string().min(1),
    });

    const data = DeleteBoardSchema.parse({
        boardId: formData.get('boardId') as string,
        boardTitle: formData.get('boardTitle') as string,
    })

    try {

        const column = await prisma.board.delete({
            where: {
                id: data.boardId,
            }
        });

        revalidatePath(`/board/`);
        return { message: `Deleted board ${data.boardTitle}` }
    } catch (e) {
        return { message: 'Failed to delete board' }
    }
}
