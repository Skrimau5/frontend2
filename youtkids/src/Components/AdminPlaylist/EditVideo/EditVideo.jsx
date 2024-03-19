import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const EditVideo = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    url: ''
  });
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const videoData = JSON.parse(localStorage.getItem('videoToEdit'));
    if (videoData) {
      setFormData({
        id: videoData._id,
        name: videoData.name,
        url: videoData.url
      });
    }
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/playlists?id=${formData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      setIsEdit(true);
      if (!response.ok) {
        throw new Error('Error updating video');
      }
    } catch (error) {
      console.error('Error updating video:', error);
      setError('Error updating video. Please try again later.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  if (isEdit) {
    return <Navigate to="/adminPlaylist" />;
  }

  return (
    <>
    <div className="centered-box">
      <h2 className="edit-video-title">Edit Video</h2>
      {error && <div className="error-message">{error}</div>}
      <form className="edit-video-form" onSubmit={handleSubmit}>
        <input className="edit-video-input" type="text" name="name" placeholder="Name *" value={formData.name} onChange={handleChange} required />
        <input className="edit-video-input" type="url" name="url" placeholder="URL" value={formData.url} onChange={handleChange} required />
        <button className="edit-video-button" type="submit">Update Video</button>
      </form>
      </div>
    </>

  );
};

export default EditVideo;