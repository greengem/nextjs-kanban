import { auth } from "@/auth";
import prisma from "@/prisma/prisma";
import { DetailedTask } from "@/types/types";

export default async function FetchTask({
  taskId,
}: {
  taskId: string;
}): Promise<DetailedTask | null> {
  const session = await auth();
  const userId = session?.user?.id;

  const boardMembership = await prisma.boardMember.findFirst({
    where: {
      userId: userId,
      board: {
        columns: {
          some: {
            tasks: {
              some: { id: taskId },
            },
          },
        },
      },
    },
  });

  if (!boardMembership) {
    return null;
  }

  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
    include: {
      column: {
        select: {
          title: true,
          boardId: true,
          board: {
            select: {
              backgroundUrl: true,
            },
          },
        },
      },
      labels: true,
      checklists: {
        include: {
          items: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      },
      activities: {
        include: {
          user: true,
          oldColumn: true,
          newColumn: true,
          originalColumn: true,
          task: true,
          board: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      assignedUsers: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!task) {
    return null;
  }

  return task as DetailedTask;
}
