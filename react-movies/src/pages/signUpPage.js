import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';

const SignUpPage = props => {
  const context = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [error, setError] = useState(""); 
  const [registered, setRegistered] = useState(false);

  const register = () => {
    setError("");  
    if (!userName.trim()) {
      setError("Username cannot be empty");
      return;
    }
    if (!password.trim()) {
      setError("Password cannot be empty");
      return;
    }
    if (!passwordAgain.trim()) {
      setError("Confirmation password cannot be empty");
      return;
    }

    if (password !== passwordAgain) {
        setError("Passwords do not match");
        return;
      }

    // Validate password complexity
    let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegEx.test(password)) {
      setError("Password must be at least 8 characters long and include a number, a letter, and a special character.");
      return;
    }

   

    context.register(userName, password)
      .then(() => {
        setRegistered(true);
      })
      .catch(error => {
        setError("Registration failed. Please try again.");
      });
  };

  if (registered) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="auth-form">
      <h2>Sign Up Page</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <input className="form-control" placeholder="User Name" value={userName} onChange={e => {
          setUserName(e.target.value); setError("");  // Clear error when user changes input
        }} />
        <input className="form-control" type="password" placeholder="Password" value={password} onChange={e => {
          setPassword(e.target.value); setError("");  // Clear error when user changes input
        }} />
        <input className="form-control" type="password" placeholder="Confirm Password" value={passwordAgain} onChange={e => {
          setPasswordAgain(e.target.value); setError("");  // Clear error when user changes input
        }} />
        <button className="button-primary" onClick={register}>Register</button>
      </div>
    </div>
  );
};

export default SignUpPage;
