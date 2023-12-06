import DeleteTaskForm from '../Forms/DeleteTaskForm';
import EditTaskForm from '../Forms/EditTaskForm';
import { IconGripVertical } from '@tabler/icons-react';
import { TaskSummary } from '@/types/types';
import { IconInfoCircle } from '@tabler/icons-react';

interface TaskItemProps {
  task: TaskSummary;
  boardId: string;
  columnId: string;
}

export default function TaskItem({ task, boardId, columnId }: TaskItemProps) {

  return (
    <div className={`flex select-none rounded-lg bg-zinc-800 shadow-md`}>
      
      {/* Drag Handle */}
      <div className='px-0 flex items-center cursor-grab touch-none'>
        <IconGripVertical className='text-purple-500' />
      </div>

      {/* Task Contents */}
      <div className='flex-grow px-3 py-2'>

        {/* Task title and edit toggle */}
        <div className='mb-1 text-sm'>
          <EditTaskForm title={task.title} boardId={boardId} taskId={task.id} />
        </div>

        {/* Task Controls */}
        <div className='flex justify-between items-center'>
          <div className='text-xs font-semibold text-purple-300'>{task.priority && `${task.priority}`}</div>
          <div className='flex gap-1'>
            <button className='bg-purple-500 p-1 rounded-md text-white'><IconInfoCircle size={14} /></button>
            <DeleteTaskForm taskId={task.id} boardId={boardId} columnId={columnId} />
          </div>
        </div>
        
      </div>

    </div>
  );
}