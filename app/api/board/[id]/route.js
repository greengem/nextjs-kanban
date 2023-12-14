import prisma from '@/db/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from "@/auth";

export async function PUT(request, { params }) {
    try {
        const session = await auth();
        const userId = session?.user?.id;
        const boardId = params.id;
        const { boardData } = await request.json();

        await prisma.$transaction(async (prisma) => {
            // Updating columns
            for (const column of boardData.columns) {
                if (column.id) {
                    await prisma.column.update({
                        where: { id: column.id },
                        data: { order: column.order },
                    });
                }
            }

            // Updating tasks and creating activity entries if needed
            for (const column of boardData.columns) {
                for (const task of column.tasks) {
                    if (task.id) {
                        // Fetch the original task data
                        const originalTask = await prisma.task.findUnique({
                            where: { id: task.id },
                        });

                        // Update the task
                        await prisma.task.update({
                            where: { id: task.id },
                            data: {
                                order: task.order,
                                columnId: column.id,
                            },
                        });

                        // Check if the task has been moved to a different column
                        if (originalTask && originalTask.columnId !== column.id) {
                            // Create a 'TASK_MOVED' activity entry
                            await prisma.activity.create({
                                data: {
                                    type: 'TASK_MOVED',
                                    userId: userId,
                                    taskId: task.id,
                                    boardId: boardId,
                                    oldColumnId: originalTask.columnId,
                                    newColumnId: column.id,
                                },
                            });
                        }
                    }
                }
            }
        });

        revalidatePath(`/board/${boardId}`);
        
        // Return success response
        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        // Return error response
        return new Response(JSON.stringify({ error: "An error occurred updating the board." }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
