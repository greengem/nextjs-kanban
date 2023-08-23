import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

function Task({ task, toggleCompleted }) {
  const [taskName, setTaskName] = useState(task.text);

  const handleNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleCheckboxChange = () => {
    toggleCompleted(task.id);
  };

  return (
    <Form.Check
      type="checkbox"
      className={`task ${task.completed ? 'completed' : ''}`}
      onChange={handleCheckboxChange}
      checked={task.completed}
      label={
        <div>
          <input
            type="text"
            value={taskName}
            onChange={handleNameChange}
            className="form-control"
          />
        </div>
      }
    />
  );
}

export default Task;
