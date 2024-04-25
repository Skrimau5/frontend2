import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';

const Watch = () => {

  const [data, setData] = useState(null);//colecciones
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(false);
  const [error, setError] = useState(null);

  const handleView = async (id) => {
    localStorage.setItem("IdView", id);
    setView(true);
  }

  const fetchData = async () => {
    fetch('http://localhost:3002/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            getChildCollections(childrenId:"${localStorage.getItem("IdChild")}") {
              _id
              name
              videos
            }
          }
        `,
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        setData(responseData.data.getChildCollections);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });

  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (view) {
    return <Navigate to="/watchVideos" />;
  }

  return (      
      <div className="playlist-container">
        <Link className='buttonh' to="/home" >Home</Link>
        {data && data.map(collection => (
          <div key={collection._id}>
            <h2>{collection.name}</h2>
            <p>Videos: {collection.videos}</p>
            <button className='kid-button-del' onClick={() => handleView(collection._id)}>Watch videos</button>
          </div>
        ))}
      </div>
  );
}

export default Watch