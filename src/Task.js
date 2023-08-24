import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function Task({ task, toggleCompleted, setTasks, tasks }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleDeleteClick = () => {
    const updatedTasks = tasks.filter(t => t.id !== task.id);
    setTasks(updatedTasks);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditChange = (event) => {
    setEditedText(event.target.value);
  };

  const handleEditSave = () => {
    const updatedTasks = tasks.map(t => {
      if (t.id === task.id) {
        return { ...t, text: editedText };
      }
      return t;
    });

    setTasks(updatedTasks);
    setIsEditing(false);
  };

  return (
    <InputGroup className={`mb-3 task ${task.completed ? 'completed' : ''}`}>
      <InputGroup.Checkbox 
        type="checkbox"
        onChange={() => toggleCompleted(task.id)}
        checked={task.completed}
        aria-label="Checkbox for following text input"
      />
      {isEditing ? (
        <Form.Control 
          aria-label="Text input with checkbox" 
          value={editedText}
          onChange={handleEditChange}
          className='shadow-none'
        />
      ) : (
        <Form.Control 
          aria-label="Text input with checkbox" 
          value={task.text}
          readOnly
          className='shadow-none'
        />
      )}
      {isEditing ? (
        <Button variant="success" onClick={handleEditSave}>Save</Button>
      ) : (
        <>
          <Button onClick={handleEditClick}>Edit</Button>
          <Button variant="danger" onClick={handleDeleteClick}>Delete</Button>
        </>
      )}
    </InputGroup>
  );
}

export default Task;
