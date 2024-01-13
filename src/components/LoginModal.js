import React, { useState, useContext, useEffect } from 'react';
import ReactModal from 'react-modal';
import UserContext from '../contexts/UserContext';
import GlobalStateContext from '../contexts/GlobalStateContext';
import './LoginModal.css';

// using react-modal to render our login modal
const LoginModal = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(UserContext);
  const { isLoginModalOpen, setIsLoginModalOpen } = useContext(GlobalStateContext);
  const [loginResult, setLoginResult] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  // resets all login states when login state changes
  useEffect(() => {
    if (!isLoginModalOpen) {
      // Reset states when the modal is closed
      setLoginResult(null);
      setUsername('');
      setPassword('');
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
    };
  }, [isLoginModalOpen, timeoutId]);

  // Handles the submission of our login form and calls the login function
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginResult(null);
    try {
      await login({ username, password });
      setLoginResult('success');
      // added a timeout to close the modal after 3 seconds to see the success message
      const id = setTimeout(() => {
        setIsLoginModalOpen(false);
      }, 2000);
      setTimeoutId(id);
    } catch (error) {
      setLoginResult('failed');
      if (timeoutId) clearTimeout(timeoutId);
    }
  };

    // This resets all fields when modal is closed
    const handleModalClose = () => {
      setIsLoginModalOpen(false);
      setLoginResult(null);
      setUsername('');
      setPassword('');
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    };

  // login modal with fields and submit button
  return (
    <ReactModal
      className="login-modal-format"
      isOpen={isLoginModalOpen}
      onRequestClose={handleModalClose}
      contentLabel="Login"
    >
      <form className="login-form-format" onSubmit={handleSubmit}>
        <input
          type="text"
          className="login-form-input"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          className="login-form-input"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          required
        />
        {loginResult === 'success' && <div className="login-success-message">Login Successful</div>}
        {loginResult === 'failed' && <div className="login-error-message">Login Failed. Check your username/password and try again.</div>}
        <button type="submit" className="login-submit-button">Login</button>
      </form>
    </ReactModal>
  );
};

export default LoginModal;