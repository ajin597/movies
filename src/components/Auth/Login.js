import { useState } from "react";
import axios from 'axios';
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";
import API from "../../api/axios";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function attemptLogin() {
        API.post('/user/', {
            username: username,
            password: password
        }).then(response => {
            setErrorMessage('');
            const { token, username: name, isAdmin } = response.data;
            const user = { username: name, token, isAdmin };
            dispatch(setUser(user));

            if (isAdmin) {
                window.location.href = 'https://gg-az95.onrender.com/admin/';
            } else {
                navigate('/blog');
            }
        }).catch(error => {
            if (error.response && error.response.data.errors) {
                setErrorMessage(Object.values(error.response.data.errors).join(' '));
            } else if (error.response && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Failed to login user. Please contact admin');
            }
        });
    }

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
        <div className="login-container" style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
            {/* SVG Animated Background */}
            <svg className="background--custom" viewBox="0 0 100 100" preserveAspectRatio="none"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                <path
                    fill="#61dd0b"
                    fillOpacity="0.6"
                    d="M-100 -100L200 -100L200 50L-100 50Z"
                    style={{ animation: "path0 4.13s linear infinite alternate" }}
                />
                <path
                    fill="#7e8219"
                    fillOpacity="0.5"
                    d="M-100 -100L200 -100L200 20L-100 20Z"
                    style={{ animation: "path1 4.09s linear infinite alternate" }}
                />
                <path
                    fill="#107964"
                    fillOpacity="0.7"
                    d="M-100 -100L200 -100L200 60L-100 60Z"
                    style={{ animation: "path2 3.42s linear infinite alternate" }}
                />
            </svg>

            <Navbar />
            <div className="container" style={{ marginTop: '150px', position: 'relative', zIndex: 1 }}>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card" style={cardStyle}>
                            <div className="card-body">
                                <h1 className="card-title">Login</h1>
                                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={username}
                                        onChange={(event) => setUsername(event.target.value)}
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <button className="btn btn-primary btn-block w-100" onClick={attemptLogin}>Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
