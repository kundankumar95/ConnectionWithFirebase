import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import './Home.css';

const Home = () => {
  const { user, loading, error } = useAuthState(auth);
  const navigate = useNavigate();

  // Handle logout action
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User logged out');
        // Redirect to login page after logout
        navigate('/login');
      })
      .catch((err) => {
        console.error('Logout error: ', err);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="box">
      {error && <div>Error: {error.message}</div>}

      {user ? (
        <div>
          <h1>Welcome to Kundan Coding Platform!</h1>
          <p>Welcome, {user.email}!</p>
          {/* Add more user info if needed */}
          <button className="btn-btn-primary btn-md" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Welcome to Kundan Coding Platform!</h1>
          <button className="btn-btn-primary btn-md" onClick={() => navigate('/login')}>
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
