import { auth } from "@/auth";
import prisma from '@/db/prisma';

export default async function TotalTasksCount() {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        throw new Error("User not authenticated");
    }

    const totalTasks = await prisma.task.count({
        where: {
            createdByUserId: userId,
            column: {
                board: {
                    members: {
                        some: { userId: userId }
                    }
                }
            },
        },
    });    

    return totalTasks;
}
