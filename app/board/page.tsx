import { getBoardsSummary } from "@/lib/FetchData";
import { BoardSummary } from "@/types/types";
import CreateBoardForm from "@/ui/Forms/CreateBoardForm";
import DeleteBoardForm from "@/ui/Forms/DeleteBoardForm";
import Link from "next/link";

export default async function Boards() {
  const boards: BoardSummary[] = await getBoardsSummary();

  return (
    <div>
      <p>Boards</p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {boards.map((board) => (
          <div key={board.id} className="p-5 bg-blue-300 rounded-xl">
            <h4 className="font-semibold">{board.title}</h4>
            <p className="text-sm">{board.description}</p>
            <Link href={`/board/${board.id}`}>View</Link>
            <DeleteBoardForm boardId={board.id} boardTitle={board.title} />
          </div>
        ))}
        <div className="p-5 bg-blue-300 rounded-xl">
          <CreateBoardForm />
        </div>
      </div>
    </div>
  );
}
