import React from 'react';
import DeleteTaskForm from '../Forms/DeleteTaskForm';
import EditTaskForm from '../Forms/EditTaskForm';
import { IconEdit } from "@tabler/icons-react";
interface TaskItemProps {
  taskId: string;
  boardId: string;
  title: string;
  priority: string | null;
}

const TaskItem: React.FC<TaskItemProps> = ({ title, priority, taskId, boardId }) => {
  const priorityClass = priority ? priority.toLowerCase() : 'default-priority';

  return (
    <li className={`bg-blue-300 flex justify-between items-center rounded-lg px-3 py-1 ${priorityClass}`}>
      <EditTaskForm title={title} boardId={boardId} taskId={taskId} />
      <DeleteTaskForm taskId={taskId} boardId={boardId} taskTitle={title} />
    </li>
  );
}

export default TaskItem;
