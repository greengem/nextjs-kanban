import React from 'react';

interface TaskItemProps {
  taskTitle: string;
  taskPriority: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ taskTitle, taskPriority }) => {
  return (
    <li className={`bg-blue-200 rounded-lg px-3 py-2 ${taskPriority.toLowerCase()}`}>
      <span>{taskTitle}</span> - <span>{taskPriority}</span>
    </li>
  );
}

export default TaskItem;
