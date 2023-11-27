import React from 'react';
import DeleteTaskForm from '../Forms/DeleteTaskForm';

interface TaskItemProps {
  taskId: string;
  boardId: string;
  title: string;
  priority: string | null;
}

const TaskItem: React.FC<TaskItemProps> = ({ title, priority, taskId, boardId }) => {
  const priorityClass = priority ? priority.toLowerCase() : 'default-priority';

  return (
    <li className={`bg-blue-300 te flex justify-between items-center rounded-lg px-3 py-1 ${priorityClass}`}>
      <span>{title}</span>
      <span>{priority}</span>
      <span><DeleteTaskForm taskId={taskId} boardId={boardId} taskTitle={title} /></span>
    </li>
  );
}

export default TaskItem;
