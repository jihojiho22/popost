import React, {useState} from 'react';
import './Signup.css';
import { doCreateUserWithEmailAndPassword } from '../firebase/auth';
import { useAuth } from '../contexts/authContext';

const Signup = () => {
    const { currentUser, setCurrentUser, setUserLoggedIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSignup = async (e) => {
      e.preventDefault();
      try {
        await doCreateUserWithEmailAndPassword(email, password);
        // User successfully signed up
        console.log('User signed up successfully!');
      } catch (error) {
        // Handle signup errors
        console.error('Error signing up:', error.message);
      }
    };
  
    return (
      <div className="auth-form">
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {/* Add more input fields for additional user details */}
          <input type="text" placeholder="Full Name" />
          <input type="text" placeholder="Username" />
          <button type="submit">Signup</button>
        </form>
      </div>
    );
  };
  
  export default Signup;