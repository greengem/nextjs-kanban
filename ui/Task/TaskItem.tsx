import { IconGripVertical } from '@tabler/icons-react';
import { TaskSummary, ExpandedTask } from '@/types/types';
import Link from 'next/link';

interface TaskItemProps {
  task: TaskSummary;
  dragHandleProps: any;
}

export default function TaskItem({ task, dragHandleProps }: TaskItemProps) {
  return (
    <div className='flex select-none rounded-md bg-zinc-800 shadow-md ring-0 hover:ring-2 hover:ring-primary'>


      <div className='pl-1 flex items-center cursor-grab touch-none' {...dragHandleProps}>
        <IconGripVertical className='text-primary' size={22} />
      </div>

      <Link className='flex-grow px-3 py-2' href={`/task/${task.id}`}>
        <div className='text-sm cursor-pointer'>
            {task.title}
        </div>
      </Link>

    </div>
  );
}
