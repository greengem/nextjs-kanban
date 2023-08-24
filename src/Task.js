import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';

function Task({ task, toggleCompleted }) {
  return (
    <ListGroup.Item className={`task ${task.completed ? 'completed' : ''}`}>
      <Form.Check 
        type="checkbox"
        onChange={() => toggleCompleted(task.id)}
        checked={task.completed}
        label={task.text}
      />
    </ListGroup.Item>
  );
}

export default Task;
