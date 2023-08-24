import React, { useState } from 'react';
import Task from './Task';
import AppNavbar from './Navbar';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Sample task 1', completed: false },
    { id: 2, text: 'Sample task 2', completed: true },
  ]);
  const [newTaskText, setNewTaskText] = useState('');

  const addTask = () => {
    if (newTaskText.trim() !== '') {
      const newTask = { id: tasks.length + 1, text: newTaskText, completed: false };
      setTasks([...tasks, newTask]);
      setNewTaskText('');
    }
  };

  const toggleCompleted = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <AppNavbar />
      <Container className='mt-4'>
        <Card>
          <Card.Body>
            <InputGroup className='mb-3'> 
              <Button variant="primary" onClick={addTask}>Add Task</Button>
              <Form.Control
                type="text"
                placeholder="Enter task text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                className='shadow-none'
              />
            </InputGroup>
            
            {tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                toggleCompleted={toggleCompleted}
                setTasks={setTasks}
                tasks={tasks}
              />
            ))}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default App;
