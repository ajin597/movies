import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import checkAuth from './Auth/checkAuth';
import Navbar from './Navbar';
import API from '../api/axios';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const user = useSelector(store => store.auth.user);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await API.get('/my-bookings/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${user.token}`
          }
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [user]);

  const handleDownloadTicket = async (bookingId) => {
    try {
      const response = await API.get(`/download/${bookingId}/`, {
        responseType: 'blob',
        headers: {
          'Authorization': `Token ${user.token}`
        }
      });
  
      const file = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = fileURL;
      link.setAttribute('download', `ticket_${bookingId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading ticket:', error.message); // Log specific error message
      if (error.response) {
        console.error('Response data:', error.response.data); // Log response data if available
        console.error('Status code:', error.response.status); // Log status code
      }
    }
  };

  return (
    <div>
      <Navbar />
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>My Bookings</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', padding: '20px' }}>
        {bookings.map((booking) => (
          <div key={booking.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px', minWidth: '200px', textAlign: 'left' }}>
            <p><strong>Booking ID:</strong> {booking.id}</p>
            <p><strong>Show:</strong> {booking.show}</p>
            <p><strong>Movie Title:</strong> {booking.show_title}</p>
            <p><strong>Number of Tickets:</strong> {booking.number_of_tickets}</p>
            <button style={{ marginTop: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }} onClick={() => handleDownloadTicket(booking.id)}>Download Ticket</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default checkAuth(MyBookings);
