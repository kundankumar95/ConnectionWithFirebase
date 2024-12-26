import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../FirebaseConfig';
import { useNavigate, useLocation } from 'react-router-dom';
import { isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink } from 'firebase/auth';

const Login = () => {
  const { user, loading, error } = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = location;

  const [email, setEmail] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [InfoMsg, setInfoMsg] = useState('');
  const [intialLoading, setInitialLoading] = useState(false);
  const [intialError, setInitialError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/');
    } else {
      const checkSignInLink = async () => {
        if (isSignInWithEmailLink(auth, window.location.href)) {
          let email = localStorage.getItem('email');
          if (!email) {
            email = window.prompt('Please provide your email');
          }
          setInitialLoading(true);
          try {
            await signInWithEmailLink(auth, email, window.location.href);
            localStorage.removeItem('email');
            setInitialLoading(false);
            setInitialError('');
            navigate('/');
          } catch (err) {
            setInitialLoading(false);
            setInitialError(err.message);
            navigate('/login');
          }
        }
      };
      checkSignInLink();
    }
  }, [user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginLoading(true);
    sendSignInLinkToEmail(auth, email, {
      url: 'http://localhost:3000/login', // absolute URL for Firebase callback
      handleCodeInApp: true,
    })
      .then(() => {
        localStorage.setItem('email', email);
        setLoginLoading(false);
        setLoginError('');
        setInfoMsg('We have sent an email with a link to sign in');
      })
      .catch((err) => {
        setLoginLoading(false);
        setLoginError(err.message);
      });
  };

  return (
    <div className="box">
      {intialLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {intialError !== '' ? (
            <div className="error-msg">{intialError}</div>
          ) : (
            <>
              {user ? (
                <div>Please wait...</div>
              ) : (
                <form className="form-group custom-form" onSubmit={handleLogin}>
                  <label>Email</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter Email"
                    className="form-control"
                    value={email || ''}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type="submit" className="btn-btn-success btn-sm">
                    {loginLoading ? <span>Logging you in...</span> : <span>Login</span>}
                  </button>
                  {loginError && <div className="error-msg">{loginError}</div>}
                  {InfoMsg && <div className="info-msg">{InfoMsg}</div>}
                </form>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Login;
