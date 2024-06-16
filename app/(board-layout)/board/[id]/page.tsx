import prisma from "@/prisma/prisma";
import { auth } from "@/auth";
import Board from "./components/Board";
import BoardNavbar from "./components/BoardNavbar";
import Image from "next/image";
import { redirect } from "next/navigation";
import { BoardWithColumns } from "@/types/types";

export default async function BoardPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { labels?: string };
}) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return <div>User not authenticated</div>;
  }

  try {
    // Check if user is a member of the board
    const isMember = await prisma.boardMember.findFirst({
      where: {
        boardId: params.id,
        userId: userId,
      },
    });

    // Redirect to board list if user is not a member
    if (!isMember) {
      redirect("/board");
    }

    // Parse labels from searchParams
    const labelFilter = searchParams.labels?.split(",") || [];

    // Fetch board with columns and tasks
    const board: BoardWithColumns | null = await prisma.board.findUnique({
      where: { id: params.id },
      include: {
        columns: {
          orderBy: { order: "asc" },
          include: {
            tasks: {
              orderBy: { order: "asc" },
              where:
                labelFilter.length > 0
                  ? {
                      labels: {
                        some: {
                          id: {
                            in: labelFilter,
                          },
                        },
                      },
                    }
                  : undefined,
              include: {
                labels: true,
                assignedUsers: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // Return if board is not found
    if (!board) {
      return <div>Board not found</div>;
    }

    return (
      <main className="flex flex-col grow min-w-0 bg-cover bg-center bg-zinc-900 relative">
        {board.backgroundUrl && (
          <Image
            className="object-cover object-center z-0"
            src={board.backgroundUrl}
            alt="Board Wallpaper"
            fill
          />
        )}
        <BoardNavbar boardId={board.id} boardTitle={board.title} />
        <Board board={board} />
      </main>
    );
  } catch (error) {
    console.error("Error fetching board data:", error);
    return <div>Failed to load board</div>;
  }
}
