import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import './View.css';

const View = () => {
//obtener todos los videos, se almacenan en un UseState
  const [videos, setVideos] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/playlists?id=${localStorage.getItem("Id")}`);
      if (!response.ok) {
        throw new Error('Error fetching videos');
      }
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <ul>
        {videos.map(video => (
          <li key={video._id}>
            <p>Nombre: {video.name}</p>
            <div>
              <ReactPlayer //Para hacer loop
                url={video.url}
                loop
                controls
              />
            </div>
          </li>
        ))}
      </ul>
            {/* Volver a la pagina anterior */}
            <Link to="/home">
        <button className='return-button'>Volver</button>
      </Link>
    </div>
  )
}

export default View