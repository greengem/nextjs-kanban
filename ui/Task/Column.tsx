'use client';
import { useState } from 'react';
import DeleteColumnForm from '../Forms/DeleteColumnForm';
import CreateTaskFormSimple from '../Forms/CreateTaskFormSimple';
import TaskItem from "@/ui/Task/TaskItem";
import { Card, CardHeader, CardBody, CardFooter, CardHeaderGrab } from '@/ui/Card/Card';
import { ColumnWithTasks, TaskSummary } from '@/types/types';
import { IconGripHorizontal, IconInfoCircle } from '@tabler/icons-react';
import { Reorder, useDragControls } from "framer-motion"

interface ColumnProps {
  column: ColumnWithTasks;
  boardId: string;
}

const Column: React.FC<ColumnProps> = ({ column, boardId }) => {
  

  const dragControls = useDragControls();

  const handleDragStart = (e: React.PointerEvent) => {
    e.preventDefault();
    dragControls.start(e);
  };

  const [tasks, setTasks] = useState<TaskSummary[]>(column.tasks);
  
  return (
        <Reorder.Item 
    key={column.id} 
    value={column} 
    className='shrink-0 w-full md:w-64 min-w-0'
    dragControls={dragControls}
    dragListener={false}
  >
    <Card>
    <div className='touch-none' onPointerDown={handleDragStart}>
      <CardHeaderGrab>
      
        <IconGripHorizontal className='text-purple-500' />
      
      </CardHeaderGrab>
      </div>
      <CardHeader className='py-1 flex justify-between'>
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
    </Reorder.Item>
  );
}

export default Column;
