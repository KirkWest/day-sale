import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';
import LoginModal from './components/LoginModal';
import RegistrationModal from './components/RegistrationModal';
import EmailModal from './components/EmailModal';
import './App.css';

const Home = () => <div>Home Page</div>;

function App() {
  return (
    <UserProvider>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
