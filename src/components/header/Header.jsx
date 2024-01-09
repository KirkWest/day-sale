import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import GlobalStateContext from '../../contexts/GlobalStateContext';
import './Header.css';

const Header = () => {
  // Checks id the current route is teh homepage for the calendar/home link toggle
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { setIsLoginModalOpen } = useContext(GlobalStateContext);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <Navbar bg="white" variant="light" expand="lg" className="header">
      <Navbar.Brand as={Link} to="/">
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
            ? <Nav.Link as={Link} to="/calendar">Calendar</Nav.Link>
            : <Nav.Link as={Link} to="/">Home</Nav.Link>}
        </Nav>
        <Nav>
          <Nav.Link onClick={handleLoginClick}>Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;