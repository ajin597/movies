import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://127.0.0.1:8000/register', {
                username: name,
                email: email,
                password: password,
                password2: passwordConf
            });

            console.log('Registration successful:', response.data);
            navigate('/login')
        } catch (error) {
            console.error('Registration error:', error.response.data);
            setErrorMessage(error.response.data.username || error.response.data.password2 || 'Registration failed');
        }
    };

    return (
        <div className='fullscreen-image'>
            <Navbar/>
                <div className="container mt-5 ">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="card-title">Register</h2>
                                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                    <form onSubmit={handleRegister}>
                                        <div className="form-group">
                                            <label>Name:</label>
                                            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label>Email:</label>
                                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label>Password:</label>
                                            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label>Confirm Password:</label>
                                            <input type="password" className="form-control" value={passwordConf} onChange={(e) => setPasswordConf(e.target.value)} />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Register</button>
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
