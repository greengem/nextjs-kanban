import React from 'react';

interface TaskItemProps {
  title: string;
  priority: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ title, priority }) => {
  return (
    <li className={`bg-blue-200 rounded-lg px-3 py-2 ${priority.toLowerCase()}`}>
      <span>{title}</span> - <span>{priority}</span>
    </li>
  );
}

export default TaskItem;
