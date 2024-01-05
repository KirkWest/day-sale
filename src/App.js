import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
