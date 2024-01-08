import { auth } from "@/auth";
import prisma from '@/db/prisma';

export default async function UpcomingDeadlinesCount() {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        throw new Error("User not authenticated");
    }

    const today = new Date();
    const sevenDaysFromNow = new Date(today);
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    const count = await prisma.task.count({
        where: {
            column: {
                board: {
                    members: {
                        some: {
                            userId: userId,
                        },
                    },
                },
            },
            dueDate: {
                gte: today,
                lt: sevenDaysFromNow
            }
        }
    });
    
    return count;
    
}
