// Task.js
import React from 'react';

function Task({ task }) {
  return (
    <div className="task">
      <input type="checkbox" />
      <p>{task.text}</p>
    </div>
  );
}

export default Task;
