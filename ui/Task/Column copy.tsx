import { SortableContext } from '@dnd-kit/sortable';
import DeleteColumnForm from '../Forms/DeleteColumnForm';
import CreateTaskFormSimple from '../Forms/CreateTaskFormSimple';
import TaskItem from "@/ui/Task/TaskItem";
import { Card, CardHeader, CardBody, CardFooter, CardHeaderGrab } from '@/ui/Card/Card';
import { ColumnWithTasks } from '@/types/types';
import { IconGripHorizontal } from '@tabler/icons-react';

interface ColumnProps {
  column: ColumnWithTasks;
  boardId: string;
}

const Column: React.FC<ColumnProps> = ({ column, boardId }) => {
  
  return (
    <li className='shrink-0 w-64'>
      <Card>
        <div className='touch-none'>
          <CardHeaderGrab>
            <IconGripHorizontal className='text-purple-500' />
          </CardHeaderGrab>
        </div>
        <CardHeader className='py-1 flex justify-between'>
          <h4 className='tracking-tight'>{column.title}</h4>
          <DeleteColumnForm boardId={boardId} columnId={column.id} columnTitle={column.title} />
        </CardHeader>
        <CardBody>
        <SortableContext items={column.tasks}>
          <div>
            {column.tasks.map(task => (
                <TaskItem 
                  key={task.id}
                  task={task}
                  boardId={boardId}
                  columnId={column.id}
                />
            ))}
          </div>
          </SortableContext>
        </CardBody>
        <CardFooter>
          <CreateTaskFormSimple boardId={boardId} columnId={column.id} />
        </CardFooter>
      </Card>
    </li>
  );
}

export default Column;
