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

export default function TaskItem({ task, boardId, columnId }: TaskItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className='my-3 touch-none flex select-none rounded-lg shadow-md bg-zinc-800 p-2'>
      {task.title}
    </div>
  );
}
