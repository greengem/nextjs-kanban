import { IconGripVertical } from '@tabler/icons-react';
import { TaskSummary } from '@/types/types';
import { IconInfoCircle } from '@tabler/icons-react';
import { Button } from '@nextui-org/button';

interface TaskItemProps {
  task: TaskSummary;
  onTaskClick: (task: TaskSummary) => void;
  dragHandleProps: any;
}

export default function TaskItem({ task, onTaskClick, dragHandleProps }: TaskItemProps) {
  return (
    <div className='flex select-none rounded-lg bg-zinc-800 shadow-md ring-0 hover:ring-2 hover:ring-primary'>


      <div className='pl-1 flex items-center cursor-grab touch-none' {...dragHandleProps}>
        <IconGripVertical className='text-primary' size={22} />
      </div>

      <div className='flex-grow px-3 py-2' onClick={() => onTaskClick(task)}>
        <div className='text-sm cursor-pointer'>
            {task.title}
        </div>
      </div>

    </div>
  );
}
