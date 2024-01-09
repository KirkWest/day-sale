import React, { useState, useContext } from 'react';
import ReactModal from 'react-modal';
import UserContext from '../contexts/UserContext';
import GlobalStateContext from '../contexts/GlobalStateContext';

// using react-modal to render our login modal
const LoginModal = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(UserContext);
  const { isLoginModalOpen, setIsLoginModalOpen } = useContext(GlobalStateContext);
  const [error, setError] = useState(null);

  // Handles the submission of our login form and calls the login function
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // this will reset error when retrying login
    try {
      await login({ username, password });
      setIsLoginModalOpen(false);
    } catch (error) {
      setError('Your login was unsuccessful, check your username and password and try again.')
    }
  };

  // login modal with fields and submit button
  return (
    <ReactModal
      isOpen={isLoginModalOpen}
      onRequestClose={() => setIsLoginModalOpen(false)}
      contentLabel="Login"
    >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          required
        />
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Login</button>
      </form>
    </ReactModal>
  );
};

export default LoginModal;