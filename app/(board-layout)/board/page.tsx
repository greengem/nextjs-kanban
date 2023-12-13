import { getBoardsSummary } from "@/lib/FetchData";
import { BoardSummary } from "@/types/types";
import CreateBoardForm from "@/ui/Forms/CreateBoardForm";
import Link from "next/link";
import { Card, CardBody } from '@/ui/Card/Card';
import PageHeading from "@/ui/PageHeading";
import { IconList  } from "@tabler/icons-react";

export default async function Boards() {
  const boards: BoardSummary[] = await getBoardsSummary();

  return (
    <div className="p-5">
      <PageHeading title='Boards' />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        
        {boards.map((board) => (
          <Link key={board.id} href={`/board/${board.id}`}>
            <Card>
              <CardBody className="
                h-28 
                flex flex-col justify-end relative
                hover:bg-zinc-800
              ">
                <span className="absolute text-xs top-2 right-2 bg-zinc-800 w-10 h-6 rounded-lg flex items-center justify-center text-primary gap-1">
                  <IconList size={16} /><span>{board.tasksCount}</span>
                </span>
                {board.title}
              </CardBody>
            </Card>
          </Link>
        ))}
        <CreateBoardForm />
      </div>
    </div>
  );
}
