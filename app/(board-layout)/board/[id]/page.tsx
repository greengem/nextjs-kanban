import { auth } from "@/auth";
import { getBoard } from "@/lib/FetchData";
import { BoardDetails } from "@/types/types";
import Board from "@/ui/Board/Board";
import { IconStar } from "@tabler/icons-react";
import BoardActions from "@/ui/Board/BoardActions";

interface BoardProps {
  params: { id: string };
}

export default async function BoardPage({ params }: BoardProps) {
  const session = await auth();
  const board: BoardDetails | null = await getBoard(params.id);

  if (!board) {
    return <div>Board not found</div>;
  }

  return (
    <>
      <div className="
        flex justify-between 
        bg-zinc-800 opacity-80 
        px-5 py-2 mb-5"
      >

        <div className="flex gap-5 items-center">
          <div>{board.title}</div>
          <button>
            <IconStar size={18} />
          </button>
          <div>Filters</div>
        </div>

        <BoardActions boardId={board.id} />
      </div>

      <Board board={board} session={session} />
    </>
  );
}
