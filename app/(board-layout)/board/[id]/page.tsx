import { auth } from "@/auth";
import { getBoard } from "@/lib/FetchData";
import { BoardDetails } from "@/types/types";
import Board from "./components/Board";
import BoardNavbar from "./components/BoardNavbar";

export default async function BoardPage({ 
  params, searchParams 
} : {
  params: { id: string }, searchParams: { label?: string }
}) {
  const session = await auth();
  const userId = session?.user?.id;
  //console.log('search param: ' + searchParams.label);

  if (!userId) {
    return null;
  }

  const board: BoardDetails | null = await getBoard(params.id, userId, searchParams.label);

  if (!board) {
    return <div>Board not found</div>;
  }

  return (
    <div 
      className="h-full bg-cover bg-center"
      style={{
        backgroundImage: `url(${board.backgroundUrl})`,
      }}
    >
      <BoardNavbar board={board} />
      <Board board={board} session={session} />
    </div>
  );
}
