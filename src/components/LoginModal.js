import React, { useState, useContext } from 'react';
import ReactModal from 'react-modal';
import UserContext from '../contexts/UserContext';

// using react-modal to render our login modal
const LoginModal = ({ isOpen, onRequestClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // this is to access the login function from UserContext
  const { login } = useContext(UserContext);

  // Handles the submission of our login form and calls the login function
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login({ username, password });
      onRequestClose(); // this will close the modal after loggin in
    } catch (error) {
      // login error handling
      console.error('Login failed:', error);
    }
  };

  // login modal with fields and submit button
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
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
        <button type="submit">Login</button>
      </form>
    </ReactModal>
  );
};

export default LoginModal;