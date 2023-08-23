import React from 'react';
import { Form } from 'react-bootstrap'; // Import Form component from React-Bootstrap

function Task({ task, toggleCompleted }) {
  const handleCheckboxChange = () => {
    toggleCompleted(task.id);
  };

  return (
    <Form.Check className={`task ${task.completed ? 'completed' : ''}`}>
      <Form.Check.Input
        type="checkbox"
        onChange={handleCheckboxChange}
        checked={task.completed}
      />
      <Form.Check.Label>{task.text}</Form.Check.Label>
    </Form.Check>
  );
}

export default Task;
