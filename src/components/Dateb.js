import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import checkAuth from "./Auth/checkAuth";
import Navbar from './Navbar';

const ShowList = () => {
  const [shows, setShows] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [error, setError] = useState(null);
  const user = useSelector(store => store.auth.user);
  const token = user ? user.token : null;

  useEffect(() => {
    const fetchShows = async () => {
      try {
        let response;
        if (selectedDate && token) {
          response = await axios.get(`http://localhost:8000/shows/${selectedDate}/`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            }
          });
        } else {
          response = await axios.get('http://localhost:8000/list', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            }
          });
        }
        setShows(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchShows();
  }, [selectedDate, token]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div>
      <Navbar />
      <div style={{ margin: '0 auto', maxWidth: '100%'}}>
        <div id="demo" className="carousel slide" data-ride="carousel">
          <ul className="carousel-indicators">
            {shows.map((show, index) => (
              <li key={index} data-target="#demo" data-slide-to={index} className={index === 0 ? "active" : ""}></li>
            ))}
          </ul>
          <div className="carousel-inner">
            {shows.map((show, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                 <Link to={`/blog1/${show.id}`}>
                <img src={`http://localhost:8000${show.image}`} alt={show.title} width="100%" height="400" />
                </Link>
              </div>
            ))}
          </div>
          <a className="carousel-control-prev" href="#demo" data-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </a>
          <a className="carousel-control-next" href="#demo" data-slide="next">
            <span className="carousel-control-next-icon"></span>
          </a>
        </div>
        
        <div>
          <h1 style={{ textAlign: 'center' }}>Explore Shows</h1>
          <label>Select Date: </label>
          <input type="date" value={selectedDate} onChange={handleDateChange} />
          {error && <p>{error}</p>}
          {selectedDate ? (
            <>
              <h2 style={{ textAlign: 'center' }}>Shows on {selectedDate}</h2>
              <div className="row ml-2">
                {shows.map(show => (
                  <div key={show.id} className="movie-card">
                    <Link to={`/blog1/${show.id}`}style={{textDecoration:'none',color:'black'}}>
                      <img src={`http://localhost:8000${show.image}`} alt="Show" />
                    
                    <div className="movie-details">
                      <h3>{show.title}</h3>
                      <p>Release date: {show.date}</p>
                      <p>Price: {show.ticket_price}</p>
                    </div>
                    </Link>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 style={{ textAlign: 'left' }}>Recommended movies</h2>
              <div className="movie-container">
                {shows.map(show => (
                  <div key={show.id} className="movie-card">
                    <Link to={`/blog1/${show.id}`} style={{textDecoration:'none',color:'black'}}>
                      <img src={`http://localhost:8000${show.image}`} alt="Show" />
                      <h3>{show.title}</h3>
                   
                    <div className="movie-details">
                      <p>Category: {show.type}</p>
                      <p>Language: {show.language}</p>
                      <p>Release date: {show.date}</p>
                      
                    </div>
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default checkAuth(ShowList);
