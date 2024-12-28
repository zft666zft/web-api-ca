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
        setError("");
        if (!userName.trim()) {
            setError("Username cannot be empty");
            return;
        }
        if (!password.trim()) {
            setError("Password cannot be empty");
            return;
        }
        try {
            const isAuthenticated = await context.authenticate(userName, password);
            if (!isAuthenticated) {
                setError("Invalid username or password");
            }
        } catch (error) {
            setError("Login failed: " + error.message);
        }
    };

    let location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if (context.isAuthenticated) {
        return <Navigate to={from.pathname} />;
    }

    return (
        <div className="login-container">
            <h2>Login Page</h2>
            {error && <p className="error">{error}</p>}
            <div>
                <input className="input-field" placeholder="User Name" value={userName} onChange={e => setUserName(e.target.value)} />
                <input className="input-field" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <button className="submit-button" onClick={login}>Log In</button>
            </div>
            <p>Not Registered? <Link to="/signup">Sign Up</Link></p>
        </div>
    );
};

export default LoginPage;
