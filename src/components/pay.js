// ShowList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import checkAuth from "./Auth/checkAuth";
import Navbar from "./Navbar";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa"
import API from "../api/axios";

const ShowList = () => {
  const { showId } = useParams();

  // 📅 today + next 6 days
  const generateNext7Dates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push(d.toISOString().split("T")[0]); // "YYYY-MM-DD"
    }
    return dates;
  };

  const [dates] = useState(generateNext7Dates);
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedTime, setSelectedTime] = useState("11:30");
  const [shows, setShows] = useState([]);
  const [error, setError] = useState(null);

  const user = useSelector((store) => store.auth.user);
  const token = user ? user.token : null;

  /* 🔄 fetch shows when date / time / token changes */
  useEffect(() => {
    const fetchShows = async () => {
      try {
        if (selectedDate && selectedTime && token) {
          const res = await API.get(
            `/shows-at-time/${selectedTime}`,
            { headers: { Authorization: `Token ${token}` } }
          );
          console.log("API data:", res.data); // 🔍 debug
          setShows(res.data);
        } else {
          setShows([]);
        }
        setError(null);
      } catch (err) {
        setError("Failed to fetch shows. Please try again later.");
        setShows([]);
      }
    };

    fetchShows();
  }, [selectedDate, selectedTime, token, showId]);

  /* 💅🏼 common pill‑button style */
  const pillStyle = (active) => ({
    border: active ? "2px solid #f84464" : "1px solid #ccc",
    backgroundColor: active ? "#fff0f3" : "#fff",
    color: "#333",
    padding: "10px 18px",
    borderRadius: "10px",
    minWidth: "90px",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: active ? "0 0 10px rgba(248,68,100,.3)" : "none",
  });
  const iconStyle = {
  color: "white",
  fontSize: "24px",
  padding: "10px",
  backgroundColor: "black", // red background like BookMyShow
  borderRadius: "50%",
  transition: "transform 0.2s ease",
  textDecoration: "none",
};



  return (
    <div>
      <Navbar />

      {/* ---------- Selection UI ---------- */}
      <div style={{ textAlign: "center", marginTop: 30 }}>
        {/* Date pills */}
        <h2 style={{ marginBottom: 15 }}>Select Date</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 15,
            flexWrap: "wrap",
            marginBottom: 30,
          }}
        >
          {dates.map((d) => {
            const label = new Date(d).toLocaleDateString("en-IN", {
              weekday: "short",
              day: "numeric",
              month: "short",
            }); // e.g. Thu, 10 Jul
            return (
              <button
                key={d}
                onClick={() => setSelectedDate(d)}
                style={pillStyle(selectedDate === d)}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Time pills */}
        <h2 style={{ marginBottom: 15 }}>Select Time</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 15,
            flexWrap: "wrap",
          }}
        >
          {["11:30", "02:30", "05:00", "09:00"].map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTime(t)}
              style={pillStyle(selectedTime === t)}
            >
              {t} {parseInt(t) < 12 ? "AM" : "PM"}
            </button>
          ))}
        </div>
      </div>

      {/* ---------- Error / Result ---------- */}
      {error && (
        <div
          className="alert alert-danger"
          role="alert"
          style={{ maxWidth: 600, margin: "30px auto" }}
        >
          {error}
        </div>
      )}

      {selectedDate && selectedTime && !error && (
        <>
          <h2 style={{ textAlign: "center", marginTop: 40 }}>
            Shows on {new Date(selectedDate).toLocaleDateString()} at {selectedTime}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 20,
              maxWidth: 1000,
              margin: "30px auto",
            }}
          >
            {shows.length === 0 && (
              <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>
                No shows available.
              </p>
            )}
            {shows.map((show) => (
              <div
                key={show.id}
                style={{
                  border: "1px solid #ccc",
                  padding: 12,
                  borderRadius: 8,
                  textAlign: "left",
                }}
              >
                <Link to={`/hh/${show.id}`} style={{ textDecoration: "none" }}>
                  <h4 style={{ marginBottom: 5, color: "#f84464" }}>
                    {show.title || "No Title Available"}
                  </h4>
                </Link>
                <p style={{ marginBottom: 5 }}>Release date: {show.date}</p>
                <p>Price: ₹{show.ticket_price}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ---------- Footer ---------- */}
      <footer
        style={{
          backgroundColor: "rgb(211,211,211)",
          padding: 30,
          marginTop: 120,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div style={{ flex: 1, minWidth: 250 }}>
            <h3>About Our Movie Site</h3>
            <p>
              Welcome to our movie site! We strive to provide you with the best
              selection of movies and TV shows, along with a seamless booking
              experience. Enjoy exploring our collection and book your tickets
              today!
            </p>
          </div>
          <div style={{ flex: 1, minWidth: 250 }}>
            <h3>Contact Us</h3>
            <p>
              Email: ajincc88@gmail.com <br />
              Phone: 9494739934 <br />
              Address: 123 Movie Street, City, Country
            </p>
          </div>
          <div
            style={{
              flex: 1,
              minWidth: 250,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
           <div
  style={{
    marginTop: "40px",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "rgb(211,211,211)",
    borderRadius: "10px",
    color: "white",
  }}
>
  <h3 style={{ fontSize: "22px", marginBottom: "15px", color:"black" }}>Follow Us</h3>
  <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={iconStyle}>
      <FaFacebookF />
    </a>
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={iconStyle}>
      <FaTwitter />
    </a>
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={iconStyle}>
      <FaInstagram />
    </a>
    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={iconStyle}>
      <FaYoutube />
    </a>
  </div>
</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default checkAuth(ShowList);
