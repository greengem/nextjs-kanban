import React, { useState } from 'react';
import Task from './Task';
import AppNavbar from './Navbar';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Sample task 1', completed: false },
    { id: 2, text: 'Sample task 2', completed: true },
  ]);

  // Function to add a new task
  const addTask = () => {
    const newTask = { id: tasks.length + 1, text: 'New task', completed: false };
    setTasks([...tasks, newTask]);
  };

  // Function to toggle task completion status
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
      <AppNavbar addTask={addTask} />
      <Container className='mt-4'>
        <Card>
          <Card.Body>
            <Card.Text>Bla!</Card.Text>
          </Card.Body>
          <ListGroup variant="flush">
            {/* Map through tasks and render Task component */}
            {tasks.map((task) => (
              <Task key={task.id} task={task} toggleCompleted={toggleCompleted} />
            ))}
          </ListGroup>
        </Card>
      </Container>
    </div>
  );
}

export default App;
