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
          <Link key={board.id} href={`/board/${board.id}`}>
            <Card className="w-64 shrink-0">
              <CardBody className="
                h-28
                text-center 
                bg-gradient-to-br from-purple-600 to-purple-800
                hover:from-purple-500 hover:to-purple-700
                flex flex-col justify-center
              ">
                {board.title}
              </CardBody>
            </Card>
          </Link>
        ))}
        <CreateBoardForm />
      </div>
    </>
  );
}
