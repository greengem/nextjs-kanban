import { auth } from "@/auth";
import { getBoard } from "@/lib/FetchData";
import { BoardDetails } from "@/types/types";
import Board from "./components/Board";
import BoardNavbar from "./components/BoardNavbar";



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
      <BoardNavbar board={board} />
      <Board board={board} session={session} />
    </>
  );
}
