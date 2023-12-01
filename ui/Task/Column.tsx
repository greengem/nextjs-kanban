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

export default function Column({ column, boardId }: ColumnProps) {  
  return (
    <li className='shrink-0 w-64'>
      <Card>
        <CardHeaderGrab className='touch-none'>
          <IconGripHorizontal className='text-purple-500' />
        </CardHeaderGrab>
        <CardHeader className='py-1'>
          <h4 className='tracking-tight'>{column.title}</h4>
        </CardHeader>
        <CardBody>
        <SortableContext items={column.tasks} id={column.id}>
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

