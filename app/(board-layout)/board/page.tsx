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
    <div>
      <p>Boards</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {boards.map((board) => (
          <Card key={board.id}>
            <CardHeader>
              <Link href={`/board/${board.id}`}>{board.title}</Link>
            </CardHeader>
            <CardBody>{board.description}</CardBody>
            <CardFooter><DeleteBoardForm boardId={board.id} boardTitle={board.title} /></CardFooter>
          </Card>
        ))}
        <Card>
          <CardBody><CreateBoardForm /></CardBody>
        </Card>
      </div>
    </div>
  );
}
