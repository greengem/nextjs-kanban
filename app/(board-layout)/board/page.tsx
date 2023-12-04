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
      <ul className="flex gap-5">
        {boards.map((board) => (
          <li key={board.id} className="w-64 shrink-0">
          <Card>
            <CardBody>
              <div className="text-xl py-5"><Link href={`/board/${board.id}`}>{board.title}</Link></div>
            </CardBody>
            <CardFooter className="bg-zinc-800">
              <div className="flex justify-end"><DeleteBoardForm boardId={board.id} boardTitle={board.title} /></div>
            </CardFooter>
          </Card>
          </li>
        ))}
        <li className="w-64 shrink-0">
          <Card>
            <CardBody><CreateBoardForm /></CardBody>
          </Card>
        </li>
      </ul>
    </>
  );
}
