import React, { useState, useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import GlobalStateContext from '../../contexts/GlobalStateContext';
import UserContext from '../../contexts/UserContext';
import './Header.css';

const Header = () => {
  // Checks if the current route is the homepage for the calendar/home link toggle
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const { setIsLoginModalOpen } = useContext(GlobalStateContext);
  const { isAuthenticated, logout } = useContext(UserContext)

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
    setIsBurgerOpen(false); // closes the nav buger when modal opens
  };

  const handleToggle = () => {
    setIsBurgerOpen(!isBurgerOpen);
  }

  return (
    <Navbar
    bg="white"
    variant="light"
    expand="lg"
    className="header"
    expanded={isBurgerOpen}
    >
      <Navbar.Brand as={Link} to="/">
        <img
          src="/images/ACELPlogo.jpg"
          alt="ACELP Logo"
          className="logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleToggle} />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          {isHomePage
            ? <Nav.Link as={Link} to="/calendar">Calendar</Nav.Link>
            : <Nav.Link as={Link} to="/">Home</Nav.Link>}
        </Nav>
        <Nav>
          {isAuthenticated
          ?<Nav.Link onClick={logout}>Logout</Nav.Link>
          :<Nav.Link onClick={handleLoginClick}>Login</Nav.Link>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;