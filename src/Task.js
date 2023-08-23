// Task.js
import React from 'react';
import './Task.css';

function Task({ task, toggleCompleted }) {
  const handleCheckboxChange = () => {
    toggleCompleted(task.id);
  };

  return (
    <div className={`task ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        onChange={handleCheckboxChange}
        checked={task.completed}
      />
      <p>{task.text}</p>
    </div>
  );
}

export default Task;
