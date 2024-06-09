import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './auth/Login';
import Signup from './auth/Signup';
import './App.css';
import { useAuth } from './contexts/authContext';
import Home from './navbar/Home'
import { doSignOut } from './firebase/auth';
import Post from './navbar/Post';
import Profile from './navbar/Profile';


function App() {
  const { userLoggedIn, currentUser, isEmailUser, isGoogleUser } = useAuth() || {};
  const debug = () => {
      console.log( "userLoggedIn: ",userLoggedIn);
      console.log( "currentUser: ",currentUser);
      console.log( "isEmailUser: ",isEmailUser);
      console.log( "isGoogleUser: ",isGoogleUser);
  };
 const signOut = () => {
    doSignOut();
 }
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/">
            <h1 className="App-logo">Popost</h1>
          </Link>
        </header>
        <nav className="App-nav">
          {!userLoggedIn && <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>}
          {userLoggedIn && <ul>
            <li>
              <button className='logout-btn' onClick={signOut}>Log out</button>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/post">Post</Link>
            </li>
          </ul>}
        </nav>

        <main className="App-main">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="/post" element={<Post />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <button onClick={debug} className='debug-btn'>debug</button>
        </main>
      </div>
    </Router>
  );
}

export default App;