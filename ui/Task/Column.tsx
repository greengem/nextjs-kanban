'use client';
import { useState } from 'react';
import { Reorder } from "framer-motion"
import DeleteColumnForm from '../Forms/DeleteColumnForm';
import CreateTaskFormSimple from '../Forms/CreateTaskFormSimple';
import TaskItem from "@/ui/Task/TaskItem";
import { Card, CardHeader, CardBody, CardFooter } from '@/ui/Card/Card';
import { ColumnWithTasks, TaskSummary } from '@/types/types';
import { IconGripHorizontal, IconInfoCircle } from '@tabler/icons-react';

interface ColumnProps {
  column: ColumnWithTasks;
  boardId: string;
}

const Column: React.FC<ColumnProps> = ({ column, boardId }) => {
  const [tasks, setTasks] = useState<TaskSummary[]>(column.tasks);

  return (
    <li className='flex-col flex-shrink-0 w-64'>
    <Card>
      <CardHeader className='bg-gray-200'>
        <div className='flex justify-between items-center'>
          <IconInfoCircle />
          <IconGripHorizontal />
          <DeleteColumnForm boardId={boardId} columnId={column.id} columnTitle={column.title} />
        </div>
        
      </CardHeader>
      <CardBody>
      <h4 className='tracking-tight'>{column.title}</h4>
        <Reorder.Group axis="y" values={tasks} onReorder={setTasks} className='overflow-y-scroll no-scrollbar' layoutScroll>
          {tasks.map(task => (
              <TaskItem 
                key={task.id}
                task={task}
                boardId={boardId}
                columnId={column.id}
              />
          ))}
        </Reorder.Group>
      </CardBody>
      <CardFooter>
        <CreateTaskFormSimple boardId={boardId} columnId={column.id} />
      </CardFooter>
    </Card>
    </li>
  );
}

export default Column;
