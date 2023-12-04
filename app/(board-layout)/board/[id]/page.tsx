import { getBoard } from "@/lib/FetchData";
import { BoardDetails } from "@/types/types";
import PageHeading from "@/ui/PageHeading";
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
      <PageHeading title={board.title} />
      <Board board={board} />
    </>
  );
}
