import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { GlobalStateProvider } from './contexts/GlobalStateContext.js';
import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';
import LoginModal from './components/LoginModal';
import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  return (
    <GlobalStateProvider>
      <UserProvider>
        <Router>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/calendar" element={<CalendarPage />} />
            </Routes>
          </main>
          {window.location.pathname === '/' && <Footer />}
          <LoginModal />
        </Router>
      </UserProvider>
    </GlobalStateProvider>
  );
}

export default App;