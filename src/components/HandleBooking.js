import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import checkAuth from "./Auth/checkAuth";
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const { showId } = useParams();
  const navigate=useNavigate()
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
        `http://localhost:8000/bookings/${showId}/`,
        { number_of_tickets: selectedSeats.length }, // Send the number of selected seats
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          }
        }
      );

      const { booking_id, razorpay_order_id, amount } = response.data;

      // Dynamically load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        // Initialize Razorpay
        const options = {
          key: 'rzp_test_H8tj7QU829vkdv',
          amount: amount * 100,
          currency: 'INR',
          order_id: razorpay_order_id,
          name: 'State Bank',
          description: 'Ticket Booking',
          handler: async function (response) {
            console.log('Payment response:', response);
            alert(`Booking confirmed! Razorpay Payment ID: ${booking_id}`);
            navigate('/blog')

            if (response.error) {
              console.error('Payment failed:', response.error);
              setError('Payment failed. Please try again.');
              setSuccess(false);
            } else {
              setSuccess(true);
              setError(null);

              // Send confirmation email to the user
              try {
                await axios.post(
                  `http://localhost:8000/send/${booking_id}/`,
                  { user_email: user.email },
                  {
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Token ${token}`
                    }
                  }
                );
              } catch (error) {
                console.error('Error sending confirmation email:', error);
              }
            }
          },
          prefill: {
            name: user.username,
            email: user.email,
            contact: '9442918295', // Replace with user's phone number
          },
          notes: {
            booking_id: booking_id,
          },
          theme: {
            color: '#3399cc',
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      };
      document.body.appendChild(script);
    } catch (error) {
      console.error('Error booking tickets:', error);
      setError('Failed to book tickets. Please try again.');
      setSuccess(false);
    }
  };

  // Function to handle seat selection
  const handleSeatSelection = (seatNumber) => {
    // Toggle seat selection
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  // Function to generate seats UI
  const generateSeats = (seatNumbers) => {
    return seatNumbers.map(seatNumber => (
      <button
        key={seatNumber}
        className="btn seat"
        style={{
          width: '50px',
          height: '50px',
          margin: '5px',
          borderRadius: '10px',
          border: '2px solid #ccc',
          backgroundColor: selectedSeats.includes(seatNumber) ? '#2ecc71' : '#f2f2f2',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onClick={() => handleSeatSelection(seatNumber)}
      >
        {seatNumber}
      </button>
    ));
  };

  return (
    <div className='ll'>
       <Navbar/>
    <div className="container mt-4">
   
      <div className="row justify-content-center"> {/* Center align movie columns */}
        <div className="col-md-12">
          <h3>Book Tickets</h3>
          <div className="movie-complex">
            <p>Screen This way!</p>
            <div className="container row movie-layout">
              <div className="movie-column">A1
                {generateSeats(Array.from({ length: 10 }, (_, i) => i + 1))}
              </div>
              <div className="movie-column">A2
                {generateSeats(Array.from({ length: 10 }, (_, i) => i + 11))}
              </div>
              <div className="movie-column">A3
                {generateSeats(Array.from({ length: 10 }, (_, i) => i + 21))}
              </div>
              <div className="movie-column">A4
                {generateSeats(Array.from({ length: 10 }, (_, i) => i + 31))}
              </div>
              <div className="movie-column">B1
                {generateSeats(Array.from({ length: 10 }, (_, i) => i + 41))}
              </div>
              <div className="movie-column">B2
                {generateSeats(Array.from({ length: 10 }, (_, i) => i + 51))}
              </div>
              <div className="movie-column">B3
                {generateSeats(Array.from({ length: 10 }, (_, i) => i + 61))}
              </div>
              <div className="movie-column">B4
                {generateSeats(Array.from({ length: 10 }, (_, i) => i + 71))}
              </div>
        
            </div>
          </div>
          <button onClick={handleBooking} className="btn btn-primary" style={{ width: '150px', marginTop: '10px' }}>Pay</button>
          {error && <p className="text-danger mt-3">{error}</p>}
          {success && <p className="text-success mt-3">Booking successful!</p>}
        </div>
      </div>
    </div>
    </div>
  );
}  

export default checkAuth(Booking);
