'use client';
import { useState } from 'react';
import { Reorder, useDragControls } from "framer-motion"
import DeleteColumnForm from '../Forms/DeleteColumnForm';
import CreateTaskFormSimple from '../Forms/CreateTaskFormSimple';
import TaskItem from "@/ui/Task/TaskItem";
import { Card, CardHeader, CardBody, CardFooter } from '@/ui/Card/Card';

interface ColumnProps {
  column: any;
  boardId: string;
}

interface Task {
  id: string;
  title: string;
  priority: string;
  order: number;
}

const Column: React.FC<ColumnProps> = ({ column, boardId }) => {
  const [tasks, setTasks] = useState<Task[]>(column.tasks);
  const controls = useDragControls()

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
