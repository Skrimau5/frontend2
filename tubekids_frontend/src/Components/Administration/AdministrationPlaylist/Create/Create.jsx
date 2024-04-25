import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import './Create.css'

const Create = () => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    collection: localStorage.getItem("IDcollection")
  });

  const [change, setChange] = useState({
    name: '',
    user: '',
    videos: 0
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
      const response = await fetch('http://localhost:3001/api/videos', {
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
      console.log(formData)
      setFormData({
        name: '',
        url: '',
        collection: localStorage.getItem("IDcollection")
      });
    } catch (error) {
      console.error('Error creating playlist:', error);
      setError('Error creating playlist. Please try again later.');
    }
    try {
      const response = await fetch(`http://localhost:3001/api/collections?id=${localStorage.getItem("IDcollection")}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(change)
      });
      if (!response.ok) {
        throw new Error('Error updating video');
      }
    } catch (error) {
      console.error('Error updating video:', error);
      console.log('Error updating video. Please try again later.');
    }
  };

  useEffect(() => {
    save();
}, []);

  if (isCreated) {
    return <Navigate to="/editCollection" />;
  }

  const save = async () => {
    const colData =await JSON.parse(localStorage.getItem('List'));
    if (colData) {
      setChange({
        name: colData.name,
        user: colData.user,
        videos: colData.videos + 1
      });
    }
  };

  return (
    <div className="wrapper">
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <h1 >Create video</h1>

        <div className='input-box'>
          <input className="input" type="text" name="name" placeholder="Name of video *" value={formData.name} onChange={handleChange} required />
        </div>

        <div className='input-box'>
          <input className="input" type="text" name="url" placeholder="URL" value={formData.url} onChange={handleChange} required />
        </div>
        <button className="button" type="submit">Create Playlist</button>
      </form>
    </div>


  )
}

export default Create 