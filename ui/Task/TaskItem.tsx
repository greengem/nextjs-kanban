'use client';
import DeleteTaskForm from '../Forms/DeleteTaskForm';
import EditTaskForm from '../Forms/EditTaskForm';
import { IconArrowDown, IconArrowUp } from '@tabler/icons-react';
import { Reorder, useDragControls } from "framer-motion"
import { IconGripVertical } from '@tabler/icons-react';

interface TaskItemProps {
  task: any;
  boardId: string;
  columnId: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, boardId, columnId }) => {
  const dragControls = useDragControls();

  const handleDragStart = (e: React.PointerEvent) => {
    e.preventDefault();
    dragControls.start(e);
  };

  return (
    <Reorder.Item 
      key={task.id} 
      value={task} 
      className='bg-blue-100 rounded-lg my-2 flex select-none'
      dragControls={dragControls}
      dragListener={false}
    >
      <div className='px-1 flex items-center cursor-grab' onPointerDown={handleDragStart}>
        <IconGripVertical className='text-blue-500 cursor-grab' />
      </div>
      <div className='flex-grow px-3 py-2 text-sm'>
        <div className='mb-1'>
          <EditTaskForm title={task.title} boardId={boardId} taskId={task.id} />
        </div>
        <div className='flex justify-end gap-1'>
          <button className='p-1 bg-blue-500 text-white rounded-md'><IconArrowUp size={14} /></button>
          <button className='p-1 bg-blue-500 text-white rounded-md'><IconArrowDown size={14} /></button>
          <DeleteTaskForm taskId={task.id} boardId={boardId} columnId={columnId} />
        </div>
      </div>
    </Reorder.Item>
  );
}

export default TaskItem;
