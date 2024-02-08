import { Task, Label } from '@prisma/client';
import { format } from 'date-fns';
import { IconClock, IconFileDescription, IconGripVertical } from '@tabler/icons-react';
import { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';
import Link from 'next/link';

interface ExtendedTask extends Task {
  labels: Label[];
}

interface TaskItemProps {
  task: ExtendedTask;
  dragHandleProps: DraggableProvidedDragHandleProps | null;
}

export default function TaskItem({ task, dragHandleProps }: TaskItemProps) {

  const renderDateInfo = () => {
    const startDate = task.startDate ? format(new Date(task.startDate), 'd MMM') : null;
    const dueDate = task.dueDate ? format(new Date(task.dueDate), 'd MMM') : null;

    if (startDate && dueDate) {
      return `${startDate} - ${dueDate}`;
    } else if (startDate) {
      return `Started: ${startDate}`;
    } else if (dueDate) {
      return dueDate;
    } else {
      return null;
    }
  };

  const showInfo = () => {
    return task.description || task.startDate || task.dueDate;
  };

  return (
    <div className='bg-white flex select-none rounded-md ring-1 ring-zinc-200 hover:shadow-md ring-0 hover:ring-2 hover:ring-primary'>

      <div className='pl-1 pr-1 flex items-center cursor-grab touch-none' {...dragHandleProps}>
        <IconGripVertical className='text-primary' size={24} />
      </div>

      <Link className='flex-grow pr-3 py-2' href={`/task/${task.id}`}>

        {task.labels && task.labels.length > 0 && (
          <div className='grid grid-cols-5 gap-1 w-full mb-1'>
            {task.labels.map(label => (
              <span key={label.id} className={`bg-${label.color}-500 text-xs h-2 w-full rounded-full`} />
            ))}
          </div>
        )}

        <div className='text-sm cursor-pointer'>
            {task.title}
        </div>
        
        {showInfo() && (
          <div className='flex gap-3 items-center mt-1'>

            {renderDateInfo() && (
              <div className='flex items-center gap-1 text-xs text-zinc-500'>
                <IconClock size={14} /> {renderDateInfo()}
              </div>
            )}

            {task.description && (
              <div className='text-zinc-500'><IconFileDescription size={14} /></div>
            )}

          </div>
        )}

      </Link>

    </div>
  );
}
