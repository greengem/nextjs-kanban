import prisma from '@/db/prisma';
import { revalidatePath } from 'next/cache';

export async function PUT(request, { params }) {
    try {
        const boardId = params.id;
        const { boardData } = await request.json();

        await prisma.$transaction(async (prisma) => {
            await prisma.task.deleteMany({ where: { column: { boardId: boardId } } });
            await prisma.column.deleteMany({ where: { boardId: boardId } });

            return prisma.board.update({
                where: { id: boardId },
                data: {
                    title: boardData.title,
                    description: boardData.description,
                    columns: {
                        create: boardData.columns.map(column => ({
                            title: column.title,
                            order: column.order,
                            tasks: {
                                create: column.tasks.map(task => ({
                                    title: task.title,
                                    description: task.description,
                                    dueDate: task.dueDate,
                                    order: task.order,
                                })),
                            },
                        })),
                    },
                },
            });
        });

        revalidatePath(`/board/${boardId}`);

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error updating board:', error);
        return new Response(JSON.stringify({ error: "An error occurred updating the board." }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
