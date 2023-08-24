// AppNavbar.js
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function AppNavbar({ addTask }) { // Receive addTask as a prop
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">ReactifyTasks</Navbar.Brand>
        <Button variant="primary" onClick={addTask}>Add Task</Button> {/* Use the addTask prop */}
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
