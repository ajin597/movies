import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import checkAuth from "./Auth/checkAuth";
import Navbar from "./Navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axiosInstance from "../api/axios";

const ShowList = () => {
  const [shows, setShows] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = useSelector((store) => store.auth.user);
  const token = user ? user.token : null;

  useEffect(() => {
    const fetchShows = async () => {
      setLoading(true);
      setError(null);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        };

        const response = selectedDate && token
          ? await axiosInstance.get(`/api/shows/${selectedDate}/`, config)
          : await axiosInstance.get("/api/list", config);

        setShows(response.data);
      } catch (error) {
        setError("Failed to fetch shows. Please try again later.");
        console.error("Error fetching shows:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, [selectedDate, token]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Slider Settings
  const sliderSettings = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 600,
  slidesToShow: 4,
  slidesToScroll: 3,
  autoplay: true,
  autoplaySpeed: 3500,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};


  return (
    <div>
      <Navbar />
      <div style={{ margin: "0 auto", maxWidth: "100%", padding: "20px" }}>
        {/* Date Filter */}
        <div className="date-filter-container" style={{ marginBottom: "20px" }}>
          <label htmlFor="date-picker" style={{ marginRight: "10px" }}>
            Filter by date:
          </label>
          <input
            type="date"
            id="date-picker"
            value={selectedDate}
            onChange={handleDateChange}
            className="form-control"
            style={{ width: "200px", display: "inline-block" }}
          />
        </div>

        {loading && <p>Loading shows...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Carousel Section */}
        <h5 className="text-dark px-2">
          <b>Coming Soon🎥</b>
        </h5>
        <div id="demo" className="carousel slide" data-ride="carousel">
          <ul className="carousel-indicators">
            {shows.map((show, index) => (
              <li
                key={show.id}
                data-target="#demo"
                data-slide-to={index}
                className={index === 0 ? "active" : ""}
              ></li>
            ))}
          </ul>
          <div className="carousel-inner">
            {shows.map((show, index) => (
              <div
                key={show.id}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <Link to={`/blog1/${show.id}`}>
                  <img
                    src={`/api${show.image}`}
                    alt={show.title}
                    style={{ width: "100%", height: "500px", objectFit: "cover" }}
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

        {/* Now Showing Carousel (react-slick) */}
        <div className="cinemaze-container">
          <h5 className="bg-gradient rounded text-dark px-2 mt-4">
            <b>Now Showing 🎬</b>
          </h5>
          {shows.length > 0 ? (
            <Slider {...sliderSettings}>
              {shows.map((show) => (
                <div key={show.id} style={{ padding: "10px" }}>
                  <div className="cinemaze-card" style={{ width: "350px" }}>
                    <img
                      src={`/api${show.image}`}
                      alt={show.title}
                      className="cinemaze-card-img"
                      onError={(e) => (e.target.src = "/fallback-image.jpg")}
                    />
                    <div className="cinemaze-card-body">
                      <h3 className="cinemaze-card-title">{show.title}</h3>
                      <p className="cinemaze-card-sub">Category: {show.type}</p>
                      <p className="cinemaze-card-sub">
                        Language: {show.language}
                      </p>
                      <p className="cinemaze-card-sub">
                        Release date: {show.date}
                      </p>
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
                </div>
              ))}
            </Slider>
          ) : (
            <p>No shows available for the selected date.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default checkAuth(ShowList);
