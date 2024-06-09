import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../firebase/auth';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await doSignInWithEmailAndPassword(email, password);
      setLoading(false);
      setTimeout(() => {
        navigate('/');
      }, 2000); // Redirect to root path after 2 seconds
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      await doSignInWithGoogle();
      setLoading(false);
      setTimeout(() => {
        navigate('/');
      }, 2000); // Redirect to root path after 2 seconds
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
      <button onClick={handleGoogleLogin} disabled={loading}>
        {loading ? 'Loading...' : 'Login with Google'}
      </button>
    </div>
  );
};

export default Login;