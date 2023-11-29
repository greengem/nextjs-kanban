
import { BoardDetails } from "@/types/types";
import CreateColumnForm from "@/ui/Forms/CreateColumnForm";
import Column from "@/ui/Task/Column";
import { Card, CardHeader, CardBody, CardFooter } from '@/ui/Card/Card';

interface BoardProps {
    board: BoardDetails;
  }

export default async function Board({ board }: BoardProps) {

  return (
    <>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {board.columns.map(column => (
          <Column key={column.id} boardId={board.id} column={column} />
        ))}
        <Card>
            <CardBody><CreateColumnForm boardId={board.id} /></CardBody>
        </Card>
      </div>
    </>
  );
}
