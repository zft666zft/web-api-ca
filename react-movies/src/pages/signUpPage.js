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
    setError("");  // Clear error messages on new submission

 
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

    // Validate password complexity
    let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegEx.test(password)) {
      setError("Password must be at least 8 characters long and include a number, a letter, and a special character.");
      return;
    }

    // Check if passwords match
    if (password !== passwordAgain) {
      setError("Passwords do not match");
      return;
    }

    // Assume context.register() is an asynchronous function that handles the registration
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
    <>
      <h2>SignUp page</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>You must register a username and password to log in </p>
      <input value={userName} placeholder="user name" onChange={e => {
        setUserName(e.target.value); setError("");  // Clear error when user changes input
      }}></input><br />
      <input value={password} type="password" placeholder="password" onChange={e => {
        setPassword(e.target.value); setError("");  // Clear error when user changes input
      }}></input><br />
      <input value={passwordAgain} type="password" placeholder="password again" onChange={e => {
        setPasswordAgain(e.target.value); setError("");  // Clear error when user changes input
      }}></input><br />
      <button onClick={register}>Register</button>
    </>
  );
};

export default SignUpPage;
