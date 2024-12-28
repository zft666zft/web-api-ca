import React, { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';
import { Link } from "react-router-dom";

const LoginPage = props => {
    const context = useContext(AuthContext);

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");  
    const login = async () => {
        setError("");  // Clear any previous error messages

        if (!userName.trim()) {
            setError("Username cannot be empty");
            return;
        }
        if (!password.trim()) {
            setError("Password cannot be empty");
            return;
        }

        try {
            // Assuming authenticate returns a promise that resolves to true if login is successful
            const isAuthenticated = await context.authenticate(userName, password);
            if (!isAuthenticated) {
                setError("Invalid username or password");
            }
        } catch (error) {
            setError("Login failed: " + error.message);  // Catch and display any error that occurs during login
        }
    };

    let location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if (context.isAuthenticated) {
        return <Navigate to={from.pathname} />;
    }

    return (
        <>
            <h2>Login page</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}  
            <p>You must log in to view the protected pages</p>
            <input id="username" placeholder="user name" value={userName} onChange={e => {
                setUserName(e.target.value);
                setError("");  // Clear error when user changes input
            }}></input><br />
            <input id="password" type="password" placeholder="password" value={password} onChange={e => {
                setPassword(e.target.value);
                setError("");  // Clear error when user changes input
            }}></input><br />
            <button onClick={login}>Log in</button>
            <p>Not Registered? <Link to="/signup">Sign Up!</Link></p>
        </>
    );
};

export default LoginPage;
