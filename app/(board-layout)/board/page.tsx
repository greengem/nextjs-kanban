import { getBoardsSummary } from "@/lib/FetchData";
import { BoardSummary } from "@/types/types";
import CreateBoardForm from "@/ui/Forms/CreateBoardForm";
import DeleteBoardForm from "@/ui/Forms/DeleteBoardForm";
import Link from "next/link";
import { Card, CardHeader, CardBody, CardFooter } from '@/ui/Card/Card';
import PageHeading from "@/ui/PageHeading";

export const dynamic = 'auto'

export default async function Boards() {
  const boards: BoardSummary[] = await getBoardsSummary();

  return (
    <>
      <PageHeading title='Boards' />
      <div className="flex gap-5">
        {boards.map((board) => (
          <div>
          <Card key={board.id} className="w-64 shrink-0">
            <CardBody className="py-5">
              <div className="text-xl"><Link href={`/board/${board.id}`}>{board.title}</Link></div>
              <p>{board.description}</p>
            </CardBody>
            <CardFooter className="bg-zinc-800">
              <div className="flex justify-end"><DeleteBoardForm boardId={board.id} boardTitle={board.title} /></div>
            </CardFooter>
          </Card>
          </div>
        ))}
          <Card className="w-64 shrink-0">
            <CardBody><CreateBoardForm /></CardBody>
          </Card>
      </div>
    </>
  );
}
