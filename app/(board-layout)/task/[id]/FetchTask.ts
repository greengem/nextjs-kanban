import { auth } from "@/auth";
import prisma from "@/prisma/prisma";

interface Task {
  id: string;
  title: string;
  description: string | null;
  dueDate: Date | null;
  startDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  order: number;
  columnId: string;
  column: {
    title: string;
    boardId: string;
    board: {
      backgroundUrl: string | null;
    };
  };
  labels: {
    id: string;
    title: string | null;
    color: string;
  }[];
  checklists: {
    id: string;
    title: string | null;
    items: {
      id: string;
      content: string;
      isChecked: boolean;
      createdAt: Date;
    }[];
  }[];
  activities: {
    id: string;
    type: string;
    content: string | null;
    createdAt: Date;
    startDate: Date | null;
    dueDate: Date | null;
    oldColumn: { title: string } | null;
    newColumn: { title: string } | null;
    originalColumn: { title: string } | null;
    task: { title: string } | null;
    user: { id: string; name: string | null; image: string | null };
  }[];
}

export default async function FetchTask({
  taskId,
}: {
  taskId: string;
}): Promise<Task | null> {
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
    select: {
      id: true,
      title: true,
      description: true,
      dueDate: true,
      startDate: true,
      createdAt: true,
      updatedAt: true,
      order: true,
      columnId: true,
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
      labels: {
        select: {
          id: true,
          title: true,
          color: true,
        },
      },
      checklists: {
        select: {
          id: true,
          title: true,
          items: {
            orderBy: {
              createdAt: "asc",
            },
            select: {
              id: true,
              content: true,
              isChecked: true,
              createdAt: true,
            },
          },
        },
      },
      activities: {
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          type: true,
          content: true,
          createdAt: true,
          startDate: true,
          dueDate: true,
          oldColumn: {
            select: { title: true },
          },
          newColumn: {
            select: { title: true },
          },
          originalColumn: {
            select: { title: true },
          },
          task: {
            select: {
              title: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });

  if (!task) {
    return null;
  }

  return task;
}
