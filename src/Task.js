import React from 'react';
import { Form } from 'react-bootstrap';

function Task({ task, toggleCompleted }) {
  const handleCheckboxChange = () => {
    toggleCompleted(task.id);
  };

  return (
    <Form.Check
      type="checkbox"
      className={`task ${task.completed ? 'completed' : ''}`}
      onChange={handleCheckboxChange}
      checked={task.completed}
      label={task.text}
    />
  );
}

export default Task;
