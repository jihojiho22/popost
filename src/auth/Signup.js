import React from 'react';
import './Signup.css';

const Signup = () => {
  return (
    <div className="auth-form">
      <h2>Signup</h2>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;