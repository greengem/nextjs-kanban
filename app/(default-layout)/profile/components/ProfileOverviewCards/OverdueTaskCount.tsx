import { auth } from "@/auth";
import prisma from '@/db/prisma';

export default async function OverdueTaskCount() {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        throw new Error("User not authenticated");
    }

    const today = new Date();

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
                lt: today,
            }
        }
    });

    return count;
}
