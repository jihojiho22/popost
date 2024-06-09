import React from 'react';
import { useAuth } from '../contexts/authContext';
import './Profile.css';

const Profile = () => {
  const { currentUser, isGoogleUser } = useAuth();

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-info">
        <div className="profile-field">
          <label>Email:</label>
          <span>{currentUser.email}</span>
        </div>
        <div className="profile-field">
          <label>Display Name:</label>
          <span>{currentUser.displayName}</span>
        </div>
        <div className="profile-field">
          <label>Google Connected:</label>
          <input type="checkbox" checked={isGoogleUser} disabled />
        </div>
      </div>
    </div>
  );
};

export default Profile;