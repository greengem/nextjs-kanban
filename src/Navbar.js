// AppNavbar.js
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">ReactifyTasks</Navbar.Brand>
        
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
