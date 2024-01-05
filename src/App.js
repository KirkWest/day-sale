import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';
import LoginModal from './components/LoginModal';
import './App.css';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <UserProvider>
      <Router>
        <div>
          <button onClick={() => setIsLoginModalOpen(true)}>Login</button>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/calendar" element={<CalendarPage />} />
          </Routes>
          <div>Hello World</div>
        </div>
        <LoginModal
          isOpen={isLoginModalOpen}
          onRequestClose={() => setIsLoginModalOpen(false)}
          />
      </Router>
    </UserProvider>
  );
}

export default App;
