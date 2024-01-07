import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './Header.css';

const Header = ({ onLoginClick }) => {
  // Checks id the current route is teh homepage for the calendar/home link toggle
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <Navbar bg="white" variant="light" expand="lg" className="header">
      <Navbar.Brand href="/">
        <img
          src="/images/ACELPlogo.jpg"
          alt="ACELP Logo"
          className="logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          {isHomePage
            ? <Nav.Link href="#calendar">Calendar</Nav.Link>
            : <Nav.Link href="/">Home</Nav.Link>}
        </Nav>
        <Nav>
          <Nav.Link onClick={onLoginClick}>Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;