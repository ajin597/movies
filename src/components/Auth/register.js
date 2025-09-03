import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import API from "../../api/axios";


function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const bg = document.getElementById("signup-background");
        if (bg) bg.style.display = "block";
        return () => {
            if (bg) bg.style.display = "none";
        };
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post('/register', {
                username: name,
                email: email,
                password: password,
                password2: passwordConf
            });
            console.log('Registration successful:', response.data);
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error.response?.data || error.message);
            setErrorMessage(
                error.response?.data?.username ||
                error.response?.data?.password2 ||
                'Registration failed'
            );
        }
    };

    const cardStyle = {
        position: "relative",
        zIndex: 1,
        margin: "auto",
        padding: "30px",
        width: "100%",
        borderRadius: "16px",
        background: "rgba(255, 255, 255, 0.1)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.37)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        color: "#fff"
    };

    return (
        <div className="register-container" style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
            <Navbar />
            <div className="container" style={{ marginTop: '150px', position: 'relative', zIndex: 1 }}>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card" style={cardStyle}>
                            <div className="card-body">
                                <h1 className="card-title">Register</h1>
                                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                <form onSubmit={handleRegister}>
                                    <div className="form-group">
                                        <label>Name:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Password:</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Confirm Password:</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={passwordConf}
                                            onChange={(e) => setPasswordConf(e.target.value)}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="form-group mt-3">
                                        <button type="submit" className="btn btn-primary btn-block w-100">Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
