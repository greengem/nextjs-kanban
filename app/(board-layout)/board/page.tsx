import { getBoardsSummary } from "@/lib/FetchData";
import { BoardSummary } from "@/types/types";
import CreateBoardForm from "@/ui/Forms/CreateBoardForm";
import DeleteBoardForm from "@/ui/Forms/DeleteBoardForm";
import Link from "next/link";
import { Card, CardHeader, CardBody, CardFooter } from '@/ui/Card/Card';

export const dynamic = 'auto'

export default async function Boards() {
  const boards: BoardSummary[] = await getBoardsSummary();

  return (
    <>
      <p>Boards</p>
      <div className="flex gap-5">
        {boards.map((board) => (
          <div key={board.id} className="w-64 shrink-0">
          <Card>
            <CardBody>
              <div><Link href={`/board/${board.id}`}>{board.title}</Link></div>
              <div>{board.description}</div>
              <div><DeleteBoardForm boardId={board.id} boardTitle={board.title} /></div>
            </CardBody>
          </Card>
          </div>
        ))}
        <Card>
          <CardBody><CreateBoardForm /></CardBody>
        </Card>
      </div>
    </>
  );
}
