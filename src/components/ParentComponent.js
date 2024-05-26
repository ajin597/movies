/* // ParentComponent.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ShowList from './Dateb';
import ShowDetails from './ShowBooking';
import Booking from './HandleBooking';

const ParentComponent = () => {
  const { showId } = useParams();

  return (
    <div>
      <ShowList showId={showId} />
      <ShowDetails showId={showId} />
      <Booking showId={showId} />
    </div>
  );
};

export default ParentComponent;
 */