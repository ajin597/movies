import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import checkAuth from "./Auth/checkAuth";
import Navbar from "./Navbar";

const ShowList = () => {
  const [shows, setShows] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [error, setError] = useState(null);
  const user = useSelector((store) => store.auth.user);
  const token = user ? user.token : null;

  useEffect(() => {
    const fetchShows = async () => {
      try {
        let response;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        };

        if (selectedDate && token) {
          response = await axios.get(
            `http://localhost:8000/shows/${selectedDate}/`,
            config
          );
        } else {
          response = await axios.get("http://localhost:8000/list", config);
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
      <h5 className=" text-dark px-2">
        <b>Coming Soon🎥</b>
      </h5>
      <div style={{ margin: "0 auto", maxWidth: "100%" }}>
        <h5 className=" text-dark px-2">
          <b>Coming Soon🎥</b>
        </h5>

        {/* Carousel Section */}
        <div id="demo" className="carousel slide" data-ride="carousel">
          <ul className="carousel-indicators">
            {shows.map((_, index) => (
              <li
                key={index}
                data-target="#demo"
                data-slide-to={index}
                className={index === 0 ? "active" : ""}
              ></li>
            ))}
          </ul>
          <div className="carousel-inner">
            {shows.map((show, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <Link to={`/blog1/${show.id}`}>
                  <img
                    src={`http://localhost:8000${show.image}`}
                    alt={show.title}
                  />
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

        {/* Date Filter and Shows */}
        <div style={{ padding: "20px" }}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}></div>

          {/* Show Grid */}
          <h5 className="bg-gradient rounded text-dark px-2">
            <b>Now Showing🎬</b>
          </h5>

          <div className="cinemaze-container">
            {shows.map((show) => (
              <div
                key={show.id}
                className="cinemaze-card"
                style={{ width: "300px", margin: "0" }} // Set margin to 0
              >
                <img
                  src={`http://localhost:8000${show.image}`}
                  alt={show.title}
                  className="cinemaze-card-img"
                  onError={(e) => (e.target.src = "/fallback-image.jpg")}
                />

                <div className="cinemaze-card-body">
                  <h3 className="cinemaze-card-title">{show.title}</h3>
                  <p className="cinemaze-card-sub">Category: {show.type}</p>
                  <p className="cinemaze-card-sub">Language: {show.language}</p>
                  <p className="cinemaze-card-sub">Release date: {show.date}</p>
                  <p className="cinemaze-card-sub">
                    Price: ₹{show.ticket_price}
                  </p>

                  <div className="cinemaze-card-btn-container">
                    <Link to={`/blog1/${show.id}`}>
                      <button className="cinemaze-book-btn" type="button">
                        Book Tickets
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default checkAuth(ShowList);
