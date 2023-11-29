'use client';
import { useState } from 'react';
import { Reorder } from "framer-motion"
import DeleteColumnForm from '../Forms/DeleteColumnForm';
import CreateTaskFormSimple from '../Forms/CreateTaskFormSimple';
import TaskItem from "@/ui/Task/TaskItem";
import { Card, CardHeader, CardBody, CardFooter } from '@/ui/Card/Card';
import { ColumnWithTasks, TaskSummary } from '@/types/types';

interface ColumnProps {
  column: ColumnWithTasks;
  boardId: string;
}

const Column: React.FC<ColumnProps> = ({ column, boardId }) => {
  const [tasks, setTasks] = useState<TaskSummary[]>(column.tasks);

  return (
    <Card>
      <CardHeader>
        <h4 className='tracking-tight'>{column.title}</h4>
        <DeleteColumnForm boardId={boardId} columnId={column.id} columnTitle={column.title} />
      </CardHeader>
      <CardBody>
        <Reorder.Group axis="y" values={tasks} onReorder={setTasks}>
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
  );
}

export default Column;
