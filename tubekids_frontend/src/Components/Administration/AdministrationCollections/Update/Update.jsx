import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';

const Update = () => {

  const [formData, setFormData] = useState({
    name: '',
    user: '',
    videos: 0
  });
  const [videos, setVideos] = useState([]);
  const [delet, setDelet] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/videos?id=${localStorage.getItem("IDcollection")}`);
      if (!response.ok) {
        throw new Error('Error fetching collections');
      }
      
      const data = await response.json();
      setVideos(data);
      
    } catch (error) {
      console.error('Error fetching collections:', error);
    }
  };
  const handleDelete = async (id) => {

    try {
      const response = await fetch(`http://localhost:3001/api/videos?id=${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Error deleting video');
      }

      setDelet(true);
      setVideos(prevVideos => prevVideos.filter(video => video._id !== id));
    } catch (error) {
      console.error('Error deleting video:', error);
      console.log('Error deleting video. Please try again later.');
    }
    try {
      const response = await fetch(`http://localhost:3001/api/collections?userId=${localStorage.getItem("IDcollection")}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Error updating video');
      }
    } catch (error) {
      console.error('Error updating video:', error);
      console.log('Error updating video. Please try again later.');
    }
  };
  const handleEdit = (video) => {
    localStorage.setItem('videoToEdit', JSON.stringify(video));
    window.location.href = '/editVideo';
  };

  useEffect(() => {
    fetchData();
    const colData = JSON.parse(localStorage.getItem('List'));
    if (colData) {
      setFormData({
        name: colData.name,
        user: colData.user,
        videos: colData.videos-1
      });
    }
    
  }, []);

  
  if(delet){
    return <Navigate to="/adminCollection" />;
}

  return (
    <div className="wrapper">
      <Link className='buttonh' to="/" >Log out</Link>
      <Link className='buttonh' to="/home" >Home</Link>
      <Link className='buttonh' to="/adminCollection" >Admin collections</Link>

      <h1 >Add videos to collection</h1>
      <Link to="/createNewVideo" className="buttonh">Create new video</Link>
      <div className="child-list-containe">
      <ul>
        {videos.map(video => (
          <li key={video._id}>
            <h1>Name: {video.name}</h1>
            <h3>Url: {video.url}</h3>
            <button className="video-delete" onClick={() => handleDelete(video._id)}>Delete</button>
            <button className="video-edit" onClick={() => handleEdit(video)}>Edit</button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  )
}

export default Update;