import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function Task({ task, toggleCompleted }) {
  return (
    <InputGroup className={`mb-3 task ${task.completed ? 'completed' : ''}`}>
      <InputGroup.Checkbox 
        type="checkbox"
        onChange={() => toggleCompleted(task.id)}
        checked={task.completed}
        aria-label="Checkbox for following text input"
      />
      <Form.Control 
        aria-label="Text input with checkbox" 
        value={task.text}
      />
    </InputGroup>
  );
}

export default Task;
