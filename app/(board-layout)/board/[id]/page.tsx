import { auth } from "@/auth";
import { getBoard } from "@/lib/FetchData";
import { BoardDetails } from "@/types/types";
import Board from "@/ui/Board/Board";

import BoardActions from "@/ui/Board/BoardActions";
import BoardFavourite from "./ui/BoardFavourite";
import BoardTitle from "./ui/BoardTitle";

interface BoardProps {
  params: { id: string };
}

export default async function BoardPage({ params }: BoardProps) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  const board: BoardDetails | null = await getBoard(params.id, userId);

  if (!board) {
    return <div>Board not found</div>;
  }

  return (
    <>
      <div className="
        flex justify-between items-center
        bg-zinc-700 opacity-80 
        px-5 py-2 mb-5"
      >

        <div className="flex gap-5 items-center">
          <BoardTitle boardTitle={board.title} boardId={board.id} />
          <BoardFavourite board={board} />
          <div>Filters</div>
        </div>

        <BoardActions boardId={board.id} />
      </div>

      <Board board={board} session={session} />
    </>
  );
}
