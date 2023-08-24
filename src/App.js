import React, { useState } from 'react';
import Task from './Task';
import AppNavbar from './Navbar';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Sample task 1', completed: false },
    { id: 2, text: 'Sample task 2', completed: true },
  ]);

  const addTask = () => {
    const newTask = { id: tasks.length + 1, text: 'New task', completed: false };
    setTasks([...tasks, newTask]);
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
            <Card.Text>
              <Button variant="primary" onClick={addTask}>Add Task</Button>
            </Card.Text>
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
