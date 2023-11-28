import { getBoard } from "@/lib/FetchData";
import { BoardDetails } from "@/types/types";
import CreateColumnForm from "@/ui/Forms/CreateColumnForm";
import Column from "@/ui/Task/Column";
import TaskItem from "@/ui/Task/TaskItem";
import { Card, CardHeader, CardBody, CardFooter } from '@/ui/Card/Card';

interface BoardProps {
  params: { id: string };
}

export default async function Board({ params }: BoardProps) {
  const board: BoardDetails | null = await getBoard(params.id);

  if (!board) {
    return <div>Board not found</div>;
  }

  return (
    <>
      <h1 className="text-3xl font-semibold mb-5">Board: {board.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {board.columns.map(column => (
          <Column key={column.id} title={column.title} columnId={column.id} boardId={board.id}>
            {column.tasks.map(task => (
              <TaskItem 
                key={task.id} 
                title={task.title} 
                priority={task.priority} 
                taskId={task.id}
                boardId={board.id}
                columnId={column.id}
              />
            ))}
          </Column>
        ))}
        <Card>
            <CardBody><CreateColumnForm boardId={board.id} /></CardBody>
        </Card>
      </div>
    </>
  );
}
