// checking program for proxy check

import React, { useState, useEffect } from 'react';
import axios from './http';

function FetchData() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get('/api/data') 
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>React Frontend</h1>
      <p>API Response: {data.message}</p>
    </div>
  );
}

export default FetchData;
