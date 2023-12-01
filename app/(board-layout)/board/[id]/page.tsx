import { getBoard } from "@/lib/FetchData";
import { BoardDetails } from "@/types/types";
import Board from "@/ui/Task/Board";
interface BoardProps {
  params: { id: string };
}

export default async function BoardPage({ params }: BoardProps) {
  const board: BoardDetails | null = await getBoard(params.id);

  if (!board) {
    return <div>Board not found</div>;
  }

  return (
    <>
      <h1 className="text-3xl tracking-tight mb-5">{board.title}</h1>
      <Board board={board} />
    </>
  );
}
