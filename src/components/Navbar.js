import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeUser } from "../store/authSlice";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faHistory } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    const user = useSelector(store => store.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function logout() {
        if (user) {
            axios.post('http://127.0.0.1:8000/logout/', {}, {
                headers: { 'Authorization': "Token " + user.token }
            })
            .then(() => {
                dispatch(removeUser());
                navigate('/Login');
            })
            .catch(error => {
                console.error("Logout error:", error);
            });
        }
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark" style={{ backgroundColor: "black" }}>
        <div className="navbar-brand">
            <h4 style={{ color: "#ffffff", margin: 0 }}> 🅱🅾🅾🅺🅼🆈🆂🅷🅾🆆 </h4>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse"
            data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse mr-auto" id="navbarNav" style={{ float: "left" }}>
            <ul className="navbar-nav ml-auto" style={{ color: "#ffffff" }}>
                {user ? (
                    user.isAdmin ? (
                        <>
                            <li className="nav-item">
                                <NavLink to={"/list1"} className="nav-link">
                                    <FontAwesomeIcon icon={faHistory} /> Admin Panel
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="#" className="nav-link" onClick={logout}>
                                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <NavLink to={"/blog"} className="nav-link">
                                    <FontAwesomeIcon icon={faFilm} /> Movie List
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={"/list"} className="nav-link">
                                    <FontAwesomeIcon icon={faHistory} /> Previous Booking
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="#" className="nav-link" onClick={logout}>
                                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                                </NavLink>
                            </li>
                        </>
                    )
                ) : (
                    <>
                        <li className="nav-item">
                            <NavLink to={"/login"} className="nav-link">
                                <FontAwesomeIcon icon={faUser} /> Login
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/register"} className="nav-link">
                                <FontAwesomeIcon icon={faUserPlus} /> Sign Up
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </div>
    </nav>
    );
}

export default Navbar;
