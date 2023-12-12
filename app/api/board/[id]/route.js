import prisma from '@/db/prisma';
import { revalidatePath } from 'next/cache';

export async function PUT(request, { params }) {
    try {
        const boardId = params.id;
        const { boardData } = await request.json();

        await prisma.$transaction(async (prisma) => {
            for (const column of boardData.columns) {
                if (column.id) {
                    await prisma.column.update({
                        where: { id: column.id },
                        data: { order: column.order },
                    });
                }
            }

            for (const column of boardData.columns) {
                for (const task of column.tasks) {
                    if (task.id) {
                        await prisma.task.update({
                            where: { id: task.id },
                            data: {
                                order: task.order,
                                columnId: column.id,
                            },
                        });
                    }
                }
            }
        });

        revalidatePath(`/board/${boardId}`);
        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "An error occurred updating the board." }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
