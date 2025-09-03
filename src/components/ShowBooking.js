import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import checkAuth from "./Auth/checkAuth";
import Navbar from "./Navbar";

const ShowDetails = () => {
  const { showId } = useParams();
  const [show, setShow] = useState(null);
  const [error, setError] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState("");
  const user = useSelector((store) => store.auth.user);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        if (!user || !user.token) {
          setError("User token is missing. Please log in.");
          return;
        }

        const response = await axios.get(
          `http://localhost:8000/api/shows/${showId}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${user.token}`,
            },
          }
        );
        console.log("Show Data:", response.data);
        setShow(response.data[0]);
        setBackgroundImage(`http://localhost:8000${response.data[0].image}`);
        setError(null);
      } catch (error) {
        setError("Failed to fetch show details. Please try again.");
      }
    };

    if (user && user.token) {
      fetchShowDetails();
    }
  }, [showId, user]);

  return (
    <div style={{}}>
      <Navbar />
      <div style={{ padding: "" }}>
        <h1 style={{ color: "black" }}>Show Details</h1>
        {error && <p>{error}</p>}
        {show && (
          <div
            className=""
            style={{
              padding: "20px",
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              height: "500px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              className="card"
              style={{
                position: "relative",
                width: "258px",
                height: "400px",
                borderRadius: "10px",
                borderColor: "grey",
                overflow: "hidden",
              }}
            >
              {show.image && (
                <img
                  className=""
                  src={`http://localhost:8000${show.image}`}
                  alt="Show Poster"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
              <div
                style={{
                  position: "absolute",
                  bottom: "0",
                  width: "100%",
                  backgroundColor: "black",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    margin: "0",
                    color: "white",
                    fontSize: "14px",
                    position: "relative",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  release date: {show.date}
                </p>
              </div>
            </div>

   <div
  style={{
    marginLeft: "70px",
    lineHeight: "2",
    backgroundColor: "rgba(244, 236, 236, 0.55)", // semi-transparent background
    padding: "25px",
    borderRadius: "12px",
    backdropFilter: "blur(1px)", // glass effect
    WebkitBackdropFilter: "blur(2px)", // for Safari support
    boxShadow: "0 8px 20px rgba(0,0,0,0.6)", // soft shadow
    width: "500px", // fixed width
    maxWidth: "90%", // responsive fallback
    color: "black",
    fontSize:"18px",
    fontWeight:"600" // default text color
  }}
>
  <h2>{show.title}</h2>
  <p>Time: {show.time}</p>
  <p>Ticket Price: {show.ticket_price}</p>
  <Link to={`/pay/${showId}`}>
  <button
    style={{
      background: "#e50914", // BookMyShow-like red
      color: "white",
      padding: "12px 24px",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
      transition: "transform 0.2s ease, background 0.3s ease",
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = "scale(1.05)";
      e.currentTarget.style.background = "#c40810";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.background = "#e50914";
    }}
  >
   Book Tickets
  </button>
</Link>

</div>


          </div>
        )}
       <div
  style={{
    backgroundColor: "rgba(255, 255, 255, 0.9)", // soft white background
    padding: "25px",
    borderRadius: "10px",
    marginTop: "30px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "1500px",
    marginLeft: "auto",
    marginRight: "auto",
  }}
>
  <h1
    style={{
      color: "#222",
      fontSize: "28px",
      fontWeight: "700",
      marginBottom: "15px",
      borderBottom: "2px solid #e50914",
      paddingBottom: "8px",
      fontFamily: "Segoe UI, sans-serif",
    }}
  >
    🎬 About the Movie
  </h1>
  <p
    style={{
      color: "#333",
      fontSize: "18px",
      lineHeight: "1.8",
      fontWeight: "400",
      fontFamily: "Segoe UI, sans-serif",
    }}
  >
    {show?.description}
  </p>
</div>

      </div>
    </div>
  );
};

export default checkAuth(ShowDetails);
