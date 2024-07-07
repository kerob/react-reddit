import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, useAuth } from '../providers/AuthProvider';

export default function Login() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  }, []);

  function handleCreateThread(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    // const formRaw = JSON.parse(formJson);

    login('email', formJson.email, formJson.password);
  }

  return (
    <div className="centered">
      {currentUser ? (
        <div>Welcome back! You will be redirected to the homepage shortly</div>
      ) : (
        <div className="sign-in post-container">
          <h2>Sign In</h2>
          <form className="sign-in__form" onSubmit={handleCreateThread}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              required
            />
            <label htmlFor="title">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              required
            />
            <button className="sign-in__button" type="submit">
              Submit
            </button>
            <a href="#" onClick={() => navigate('/register')}>
              Need an account? Register Here
            </a>
          </form>
        </div>
      )}
    </div>
  );
}
