import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
// import './AdminPlaylist.css'

const AdminPlaylist = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState('');

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/playlists?id=${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Error deleting video');
      }
      setVideos(prevVideos => prevVideos.filter(video => video._id !== id));
    } catch (error) {
      console.error('Error deleting video:', error);
      setError('Error deleting video. Please try again later.');
    }
  };

  const handleEdit = (video) => {
    localStorage.setItem('videoToEdit', JSON.stringify(video));
    window.location.href = '/editVideo'; 
  };

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
      setError('Error fetching videos. Please try again later.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="playlist-container">
    <h2 className="playlist-title">Playlist</h2>
    <Link to="/createVideo" className="playlist-button">Create new video</Link>
    {error && <div className="error-message">{error}</div>}
    <ul className="playlist-list">
      {videos.map(video => (
        <li key={video._id} className="playlist-item">
          <p className="video-name">Name: {video.name}</p>
          <div className="video-player">
            <ReactPlayer
              url={video.url}
              loop
              controls
            />
          </div>
          <div className="video-controls">
            <button className="video-delete" onClick={() => handleDelete(video._id)}>Delete</button>
            <button className="video-edit" onClick={() => handleEdit(video)}>Edit</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default AdminPlaylist;