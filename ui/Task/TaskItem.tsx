'use client'
import DeleteTaskForm from '../Forms/DeleteTaskForm';
import EditTaskForm from '../Forms/EditTaskForm';
import { IconArrowDown, IconArrowUp, IconEdit, IconTrash } from '@tabler/icons-react';

interface TaskItemProps {
  taskId: string;
  boardId: string;
  columnId: string;
  title: string;
  priority: string | null;
}

const TaskItem: React.FC<TaskItemProps> = ({ title, priority, taskId, boardId, columnId }) => {
  const priorityClass = priority ? priority.toLowerCase() : 'default-priority';

  return (
    <li className={`bg-blue-100 rounded-lg space-y-2 px-3 py-2 my-2 ${priorityClass}`}>
      <div><EditTaskForm title={title} boardId={boardId} taskId={taskId} /></div>
      <div className='flex justify-end gap-1'>
        <button className='p-1 bg-blue-500 text-white rounded-md'><IconArrowUp size={14} /></button>
        <button className='p-1 bg-blue-500 text-white rounded-md'><IconArrowDown size={14} /></button>
        <DeleteTaskForm taskId={taskId} boardId={boardId} columnId={columnId} />
      </div>
    </li>
  );
}

export default TaskItem;
