
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

      <ul className="flex gap-5">
        {board.columns.map(column => (
          <Column key={column.id} boardId={board.id} column={column} />
        ))}
        <Card>
            <CardBody><CreateColumnForm boardId={board.id} /></CardBody>
        </Card>
      </ul>
    </>
  );
}
