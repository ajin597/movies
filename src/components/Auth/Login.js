import { useState } from "react";
import axios from 'axios';
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function attemptLogin() {
        axios.post('http://127.0.0.1:8000/user/', {
            username: username,
            password: password
        }).then(response => {
            setErrorMessage('');
            const{ token,username:name,isAdmin}=response.data
            const user = {
                username: name,
                token,
                isAdmin,
            };
            dispatch(setUser(user));
            if(isAdmin){
                window.location.href = 'http://127.0.0.1:8000/admin/';
            }else{
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

    return (
        <div className="gg">
            <Navbar />
            <div className="container" style={{marginTop:'150px'}}>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
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
                                <div className="form-group">
                                    <button className="btn btn-primary btn-block" onClick={attemptLogin}>Login</button>
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
