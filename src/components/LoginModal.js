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
  const [loginResult, setLoginResult] = useState(null);

  // Handles the submission of our login form and calls the login function
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginResult(null);
    try {
      await login({ username, password });
      setLoginResult('success');
      // added a timeout to close the modal after 3 seconds to see the success message
      setTimeout(() => {
        setIsLoginModalOpen(false);
      }, 3000);
    } catch (error) {
      setLoginResult('failed')
    }
  };

  // login modal with fields and submit button
  return (
    <ReactModal
      className="Login-modal-format"
      isOpen={isLoginModalOpen}
      onRequestClose={() => setIsLoginModalOpen(false)}
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