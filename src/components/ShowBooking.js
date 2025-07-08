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

            <div className="" style={{ marginLeft: "70px", lineHeight: "2" }}>
              <h3 style={{ color: "white" }}>{show.title}</h3>
              <p style={{ color: "white" }}>Time: {show.time}</p>
              <p style={{ color: "white" }}>
                Ticket Price: {show.ticket_price}
              </p>
              <Link to={`/pay/${showId}`}>
                <button className="btn btn-danger" style={{}}>
                  Book tickets
                </button>
              </Link>
            </div>
          </div>
        )}
        <h1 style={{ color: "black", marginTop: "10px" }}>About the Movie</h1>
        <p style={{ color: "black" }}> {show?.description}</p>
      </div>
    </div>
  );
};

export default checkAuth(ShowDetails);
