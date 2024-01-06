import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';
import LoginModal from './components/LoginModal';
import Header from './components/header/Header.jsx'

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <UserProvider>
      <Router>
        <Header onLoginClick={handleLoginClick} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
        <LoginModal
          isOpen={isLoginModalOpen}
          onRequestClose={() => setIsLoginModalOpen(false)}
        />
      </Router>
    </UserProvider>
  );
}

export default App;
