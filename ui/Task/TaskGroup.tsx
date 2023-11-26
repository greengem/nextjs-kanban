import React from 'react';

interface TaskGroupProps {
  taskGroupTitle: string;
  children: React.ReactNode;
}

const TaskGroup: React.FC<TaskGroupProps> = ({ taskGroupTitle, children }) => {
  return (
    <div className="bg-blue-300 p-5 w-64 rounded-lg">
      <h4 className='font-semibold mb-2'>{taskGroupTitle}</h4>
      <div>
        <ul className='text-sm space-y-2'>
          {children}
        </ul>
      </div>
    </div>
  );
}

export default TaskGroup;
