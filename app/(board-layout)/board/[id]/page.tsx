import { getBoard } from "@/lib/FetchData";
import { BoardDetails } from "@/types/types";
import DeleteBoardForm from "@/ui/Forms/DeleteBoardForm";
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
      <div className="flex justify-between">
        <PageHeading title={board.title} />
        <DeleteBoardForm boardId={board.id} boardTitle={board.title} />
      </div>
      <Board board={board} />
    </>
  );
}
