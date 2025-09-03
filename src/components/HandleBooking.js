import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import checkAuth from "./Auth/checkAuth";
import Navbar from './Navbar';
import axiosInstance from "../api/axios";

const Booking = () => {
  const { showId } = useParams();
  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const user = useSelector(store => store.auth.user);
  const token = user ? user.token : null;

  const handleBooking = async () => {
    try {
      if (!showId) {
        setError('Show ID is missing.');
        return;
      }

      const response = await axios.post(
        `/api/bookings/${showId}/`,
        { number_of_tickets: selectedSeats.length },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          }
        }
      );

      const { booking_id, razorpay_order_id, amount } = response.data;

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        const options = {
          key: 'rzp_test_H8tj7QU829vkdv',
          amount: amount * 100,
          currency: 'INR',
          order_id: razorpay_order_id,
          name: 'State Bank',
          description: 'Ticket Booking',
          handler: async function (response) {
            alert(`Booking confirmed! Razorpay Payment ID: ${booking_id}`);
            navigate('/blog');

            if (response.error) {
              setError('Payment failed. Please try again.');
              setSuccess(false);
            } else {
              setSuccess(true);
              setError(null);
              try {
                await axios.post(
                  `/api/send/${booking_id}/`,
                  { user_email: user.email },
                  {
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Token ${token}`
                    }
                  }
                );
              } catch (error) {
                console.error('Email send failed:', error);
              }
            }
          },
          prefill: {
            name: user.username,
            email: user.email,
            contact: '9442918295',
          },
          notes: { booking_id },
          theme: { color: '#3399cc' },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      };
      document.body.appendChild(script);
    } catch (error) {
      console.error('Booking failed:', error);
      setError('Failed to book tickets. Please try again.');
      setSuccess(false);
    }
  };

  const handleSeatSelection = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const generateSeats = (seatNumbers) =>
    seatNumbers.map(seatNumber => (
      <button
        key={seatNumber}
        onClick={() => handleSeatSelection(seatNumber)}
        style={{
          width: '50px',
          height: '35px',
          margin: '6px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: selectedSeats.includes(seatNumber) ? '#18b015' : '#2d2d2d',
          color: selectedSeats.includes(seatNumber) ? '#fff' : '#ccc',
          fontSize: '0.9rem',
          cursor: 'pointer',
          transition: '0.2s',
        }}
      >
        {seatNumber}
      </button>
    ));

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at top, #0c0c0c 0%, #141414 40%, #000 100%)',
        color: '#eee',
        fontFamily: 'Segoe UI, Roboto, sans-serif',
      }}
    >
      <Navbar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-10 text-center">
            <h3 style={{ color: 'white', marginBottom: '20px' }}>🎟️ Book Your Seats</h3>

            <div style={{ marginBottom: '30px' }}>
              <p
                style={{
                  textAlign: 'center',
                  padding: '6px 0',
                  fontWeight: '600',
                  letterSpacing: '1px',
                  color: '#f2f2f2',
                  borderTop: '3px solid #e50914',
                  borderBottom: '3px solid #e50914',
                  width: '240px',
                  margin: '0 auto 20px',
                  fontSize: '18px',
                }}
              >
                SCREEN THIS WAY
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '20px 30px',
                  justifyContent: 'center',
                  padding: '0 10px',
                }}
              >
                {["A", "B"].map((row) =>
                  [1, 2, 3, 4].map((col) => {
                    const label = `${row}${col}`;
                    const start = row === "A" ? 1 : 41;
                    const offset = (col - 1) * 10;
                    return (
                      <div key={label} style={{ textAlign: 'center' }}>
                        <div style={{ fontWeight: '600', marginBottom: '8px', color: '#ddd' }}>{label}</div>
                        {generateSeats(Array.from({ length: 10 }, (_, i) => i + start + offset))}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <button
              onClick={handleBooking}
              className="btn btn-primary"
              style={{
                backgroundColor: '#e50914',
                border: 'none',
                padding: '12px 30px',
                fontSize: '16px',
                fontWeight: 'bold',
                borderRadius: '6px',
              }}
            >
              Pay
            </button>

            {error && <p className="text-danger mt-3">{error}</p>}
            {success && <p className="text-success mt-3">🎉 Booking successful!</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default checkAuth(Booking);
