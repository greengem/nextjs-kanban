import { BoardSummarySidebar } from "@/types/types";
import { auth } from "@/auth";
import prisma from '@/db/prisma';
import SidebarWrapper from "./SidebarWrapper";

export default async function SidebarNav() {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        return [];
    }

    const boards: BoardSummarySidebar[] = await prisma.boardMember.findMany({
        where: {
            userId: userId,
        },
        include: {
            board: {
                select: {
                    id: true,
                    title: true,
                }
            }
        },
        orderBy: {
            createdAt: 'asc',
        }
    });

    return (<SidebarWrapper boards={boards} />);
}