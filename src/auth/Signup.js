import React, { useState } from 'react';
import './Signup.css';
import { doCreateUserWithEmailAndPassword } from '../firebase/auth';
import { useAuth } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';

const Signup = () => {
  const { currentUser, setCurrentUser, setUserLoggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await doCreateUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      if (user) {
        // Update the user's profile with the username using the updateProfile function
        await updateProfile(user, { displayName: username });
        // Navigate to the login page after a short delay
        setTimeout(() => {
          setLoading(false);
          navigate('/login');
        }, 1000);
        // User successfully signed up
        console.log('User signed up successfully!', user.displayName); // You can access the username here
      } else {
        throw new Error('User object is not available');
      }
    } catch (error) {
      // Handle signup errors
      setLoading(false);
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <div className="auth-form">
      {loading ? (
        <div className="loading-screen">Loading...</div>
      ) : (
        <>
          <h2>Signup</h2>
          <form onSubmit={handleSignup}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {/* Add more input fields for additional user details */}
            <input type="text" placeholder="Full Name" />
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <button type="submit">Signup</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Signup;
