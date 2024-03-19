import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const CreateVideo = () => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    user: localStorage.getItem("Id")
  });

  const [isCreated, setIsCreated] = useState(false);

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      setIsCreated(true);
      if (!response.ok) {
        throw new Error('Error creating playlist');
      }

      const data = await response.json();
      console.log('Playlist created successfully:', data);
      setError('');

      setFormData({
        name: '',
        url: '',
        user: localStorage.getItem("Id")
      });
    } catch (error) {
      console.error('Error creating playlist:', error);
      setError('Error creating playlist. Please try again later.');
    }
  };

  if (isCreated) {
    return <Navigate to="/adminPlaylist" />;
  }

  return (
    <div className="create-video-container">
      <h2 className="create-video-title">Create video</h2>
      {error && <div className="error-message">{error}</div>}
      <form className="create-video-form" onSubmit={handleSubmit}>
        <input className="create-video-input" type="text" name="name" placeholder="Name of video *" value={formData.name} onChange={handleChange} required />
        <input className="create-video-input" type="text" name="url" placeholder="URL" value={formData.url} onChange={handleChange} required />
        <button className="create-video-button" type="submit">Create Playlist</button>
      </form>
    </div>


  )
}

export default CreateVideo