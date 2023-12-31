import prisma from '@/db/prisma';
import { auth } from "@/auth";
import { BoardDetails, ColumnWithTasks, LabelSummary } from "@/types/types";
import Board from "./components/Board";
import BoardNavbar from "./components/BoardNavbar";

export default async function BoardPage({
  params,
  searchParams
}: {
  params: { id: string };
  searchParams: { labels?: string };
}) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return <div>User not authenticated</div>;
  }

  const labelIds = searchParams.labels ? searchParams.labels.split(',') : [];
  const labelCondition: { labels?: { some: { id: { in: string[] } } } } = labelIds.length > 0
    ? { labels: { some: { id: { in: labelIds } } } }
    : {};
  
  const isMember = await prisma.boardMember.findFirst({
    where: {
      boardId: params.id,
      userId: userId,
    }
  });

  if (!isMember) {
    return <div>Access denied: User is not a member of this board</div>;
  }

  const board = await prisma.board.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      title: true,
      backgroundUrl: true,
      favoritedBy: {
        where: {
          userId: userId
        },
        select: {
          userId: true
        }
      },
      columns: {
        orderBy: {
          order: 'asc'
        },
        select: {
          id: true,
          title: true,
          order: true,
          tasks: {
            orderBy: {
              order: 'asc'
            },
            where: labelCondition,
            select: {
              id: true,
              title: true,
              description: true,
              order: true,
              columnId: true,
              startDate: true,
              dueDate: true,
              labels: {
                select: {
                  id: true,
                  title: true,
                  color: true
                }
              }
            }
          }
        }
      }
    }
  });

  if (!board) {
    return <div>Board not found</div>;
  }

  const uniqueLabels = extractUniqueLabels(board.columns);

  const boardDetails: BoardDetails & { uniqueLabels: LabelSummary[] } = {
    ...board,
    isFavorited: !!board.favoritedBy?.length,
    tasksCount: board.columns?.reduce((sum, column) => sum + column.tasks.length, 0) ?? 0,
    uniqueLabels
  };

  const backgroundStyle = { backgroundImage: board.backgroundUrl ? `url(${board.backgroundUrl})` : 'none' };

  return (
    <main className="flex flex-col grow min-w-0 bg-cover bg-center bg-zinc-200" style={backgroundStyle}>
      <BoardNavbar board={boardDetails} />
      <Board board={boardDetails} session={session} />
    </main>
  );
}

function extractUniqueLabels(columns: ColumnWithTasks[] | undefined): LabelSummary[] {
  const uniqueLabelsMap = new Map<string, LabelSummary>();
  columns?.forEach(column => {
    column.tasks.forEach(task => {
      task.labels.forEach(label => {
        uniqueLabelsMap.set(label.id, label);
      });
    });
  });
  return Array.from(uniqueLabelsMap.values());
}
