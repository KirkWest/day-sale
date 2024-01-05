import React, { useState, useContext } from 'react';
import ReactModal from 'react-modal';
import UserContext from '../contexts/UserContext';

// using react-modal to render our login modal
const LoginModal = ({ isOpen, onRequestClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(UserContext);

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
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </ReactModal>
  );
};

export default LoginModal;