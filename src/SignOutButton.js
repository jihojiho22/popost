import React from 'react';
import { useNavigate } from 'react-router-dom';
import { doSignOut } from './firebase/auth';

const SignOutButton = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    doSignOut();
    navigate('/');
  };

  return <button className='logout-btn' onClick={handleSignOut}>Log out</button>;
};

export default SignOutButton;