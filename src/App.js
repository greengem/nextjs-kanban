// App.js
import React, { useState } from 'react';
import Task from './Task';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Sample task 1', completed: false },
    { id: 2, text: 'Sample task 2', completed: true },
  ]);

  const toggleCompleted = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const addTask = () => {
    const newTask = { id: tasks.length + 1, text: 'New task', completed: false };
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="App">
      <Container>
      <h1>ToDo App</h1>
      <Button variant='primary' onClick={addTask}>Add Task</Button>
      <Form>
      {tasks.map((task) => (
        <Task key={task.id} task={task} toggleCompleted={toggleCompleted} />
      ))}
      </Form>
      </Container>
    </div>

  );
}

export default App;
