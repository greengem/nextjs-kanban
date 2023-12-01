import { useSortable } from '@dnd-kit/sortable';
import DeleteTaskForm from '../Forms/DeleteTaskForm';
import EditTaskForm from '../Forms/EditTaskForm';
import { IconGripVertical } from '@tabler/icons-react';
import { TaskSummary } from '@/types/types';
import { IconInfoCircle } from '@tabler/icons-react';
import { CSS } from '@dnd-kit/utilities';

interface TaskItemProps {
  task: TaskSummary;
  boardId: string;
  columnId: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, boardId, columnId }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };


  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className='my-3 flex select-none rounded-lg shadow-md'>
      
      <div className='px-0 flex items-center cursor-grab bg-zinc-800 rounded-l-lg touch-none'>
        <IconGripVertical className='text-purple-500' />
      </div>

      <div className='flex-grow px-3 py-2 rounded-r-lg bg-zinc-800'>

        <div className='mb-1 text-sm font-semibold'>
          <EditTaskForm title={task.title} boardId={boardId} taskId={task.id} />
        </div>

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

export default TaskItem;
