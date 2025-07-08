import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import checkAuth from "./Auth/checkAuth";
import Navbar from "./Navbar";

const ShowList = () => {
  const { showId } = useParams();
  const [shows, setShows] = useState([]);
  const [selectedDate, setSelectedDate] = useState("2024-05-22");
  const [selectedTime, setSelectedTime] = useState("11:30"); // Default to 11:30 AM
  const [error, setError] = useState(null);
  const user = useSelector((store) => store.auth.user);
  const token = user ? user.token : null;

  useEffect(() => {
    const fetchShows = async () => {
      try {
        if (selectedDate && selectedTime && token) {
          const response = await axios.get(
            `http://localhost:8000/shows-at-time/${selectedTime}`,
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          setShows(response.data);
        } else {
          setShows([]);
        }
        setError(null); // Reset error state if no error occurs
      } catch (error) {
        setError("Failed to fetch shows. Please try again later."); // Set error message
        setShows([]); // Clear shows if there's an error
      }
    };

    fetchShows();
  }, [selectedDate, selectedTime, token, showId]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  return (
    <div>
      <Navbar />
      <div style={{ margin: "0 auto", maxWidth: "100%" }}>
        <div>
          <h1 style={{ textAlign: "center" }}>Explore Shows</h1>
          <label>Select Date: </label>
          <input type="date" value={selectedDate} onChange={handleDateChange} />
          <label>Select Time: </label>
          <select value={selectedTime} onChange={handleTimeChange}>
            <option value="11:30">11:30 AM</option>
            <option value="2:30">2:30 PM</option>
            <option value="5:00">5:00 PM</option>
            <option value="9:00">9:00 PM</option>
          </select>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {selectedDate && selectedTime && !error && (
            <>
              <h2 style={{ textAlign: "center" }}>
                Shows on {selectedDate} at {selectedTime}
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "20px",
                }}
              >
                {shows.map((show) => (
                  <div
                    key={show.id}
                    style={{ border: "1px solid #ccc", padding: "10px" }}
                  >
                    <Link to={`/hh/${show.id}`}>
                      <h4
                        style={{ marginBottom: "5px", textDecoration: "none" }}
                      >
                        {show.title}
                      </h4>
                    </Link>
                    <p style={{ marginBottom: "5px" }}>
                      Release date: {show.date}
                    </p>
                    <p>Price: {show.ticket_price}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <footer
        style={{
          backgroundColor: "rgb(211, 211, 211)",
          padding: "30px",
          marginTop: "200px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
          }}
        >
          <div>
            <h3>About Our Movie Site</h3>
            <p>
              Welcome to our movie site! We strive to provide you with the best
              selection of movies and TV shows, along with a seamless booking
              experience. Enjoy exploring our collection and book your tickets
              today!
            </p>
          </div>
          <div>
            <h3>Contact Us</h3>
            <p>
              Email: ajincc88@gmail.com <br />
              Phone: 9494739934 <br />
              Address: 123 Movie Street, City, Country
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <h3>Follow Us</h3>
            <div style={{ display: "flex", gap: "10px" }}>
              <a
                href="https://www.facebook.com/moviesite"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  style={{ fill: "grey" }}
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M11 20v-7H8v-3h3V8.15C11 5.24 12.82 4 15.5 4c1.34 0 2.5.1 2.84.15V7h-2c-1.53 0-1.84.73-1.84 1.8V10h3l-.39 3h-2.61v7H11zm2-13.46c-.95 0-1.74.77-1.74 1.7v1.76h3.47c-.22 1.18-1.27 3.46-3.47 3.46v2.78l-.38.04L11 17v-2.96c-1.21-.06-1.85-.73-1.85-1.79V7.24c0-.97.79-1.74 1.74-1.74h1.52z" />
                </svg>
              </a>
              <a
                href="https://www.twitter.com/moviesite"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  style={{ fill: "grey" }}
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M22.46 6c-.54.24-1.12.4-1.72.48.62-.37 1.1-.96 1.32-1.66-.58.34-1.22.58-1.9.7-.54-.58-1.3-.94-2.14-.94-1.62 0-2.94 1.32-2.94 2.94 0 .23.03.46.08.68-2.44-.13-4.6-1.3-6.05-3.09-.25.43-.4.93-.4 1.46 0 1.02.52 1.92 1.31 2.44-.48-.02-.93-.15-1.32-.37v.04c0 1.42.99 2.6 2.31 2.87-.25.07-.52.11-.8.11-.2 0-.39-.02-.58-.07.39 1.23 1.52 2.13 2.85 2.16-1.05.82-2.36 1.31-3.78 1.31-.25 0-.49-.02-.73-.04 1.35.86 2.95 1.37 4.67 1.37 5.6 0 8.67-4.64 8.67-8.67v-.39c.6-.46 1.12-1.02 1.53-1.66z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/bookmyshowin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  style={{ fill: "grey" }}
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 17.59c0 .56-.45 1.01-1.01 1.01H8.01c-.56 0-1.01-.45-1.01-1.01V8.41c0-.56.45-1.01 1.01-1.01h7.98c.56 0 1.01.45 1.01 1.01v11.18zM12 6c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default checkAuth(ShowList);
