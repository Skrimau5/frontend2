import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import './Update.css'

const Update = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    pin: '',
    age: '',
    avatar: ''
  });
  const [isEdit, setIsEdit] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [imageLinks] = useState([
    'https://cdn-icons-png.freepik.com/256/1326/1326418.png?ga=GA1.1.74766830.1710471239&',
    'https://cdn-icons-png.freepik.com/256/1326/1326412.png?ga=GA1.1.74766830.1710471239&',
    'https://cdn-icons-png.freepik.com/256/1326/1326405.png?ga=GA1.1.74766830.1710471239&',
    'https://cdn-icons-png.freepik.com/256/1675/1675908.png?ga=GA1.1.74766830.1710471239&',
    'https://cdn-icons-png.freepik.com/256/4322/4322991.png?ga=GA1.1.74766830.1710471239&',
    'https://cdn-icons-png.freepik.com/256/5189/5189327.png?ga=GA1.1.74766830.1710471239&',
    'https://cdn-icons-png.freepik.com/256/5094/5094283.png?ga=GA1.1.74766830.1710471239&',
    'https://cdn-icons-png.freepik.com/256/1805/1805835.png?ga=GA1.1.74766830.1710471239&'
  ]);

  useEffect(() => {
    const childData = JSON.parse(localStorage.getItem('childToEdit'));
    if (childData) {
      setFormData({
        id: childData._id,
        name: childData.name,
        pin: childData.pin,
        age: childData.age,
        avatar: childData.avatar
      });
      setSelectedAvatar(childData.avatar);
    }
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/childrens?id=${formData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      setIsEdit(true);
      if (!response.ok) {
        throw new Error('Error updating child');
      }
      
    } catch (error) {
      console.error('Error updating child:', error);
      setError('Error updating child. Please try again later.');
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

  const handleImageClick = (imageLink) => {
    setSelectedAvatar(imageLink);
    setFormData(prevData => ({
      ...prevData,
      avatar: imageLink 
    }));
    closeModal();
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  if (isEdit) {
    return <Navigate to="/adminKids" />; 
  }

  return (
    <>
  <h2 className="update-title">Update profile</h2>
  {error && <div className="error-message">{error}</div>}
  <form className="update-form" onSubmit={handleSubmit}>
    <input className="update-input" type="text" name="name" placeholder="Name *" value={formData.name} onChange={handleChange} required />
    <input className="update-input" type="text" name="pin" placeholder="PIN *" value={formData.pin} onChange={handleChange} required />
    <input className="update-input" type="number" name="age" placeholder="Age *" value={formData.age} onChange={handleChange} required />
    {selectedAvatar && <img className="update-avatar" src={selectedAvatar} alt="Selected Avatar" />}
    <button className="update-button" type="button" onClick={openModal}>Select Avatar</button>
    <button className="update-button" type="submit">Update Child</button>
  </form>
  {isOpen && (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeModal}>Cerrar modal</button>
        <h2>Select image for avatar</h2>
        <div className="image-container">
          {imageLinks.map((imageLink, index) => (
            <img
              key={index}
              className="update-avatar"
              src={imageLink}
              alt={`Imagen ${index + 1}`}
              onClick={() => handleImageClick(imageLink)}
            />
          ))}
        </div>
      </div>
    </div>
  )}
</>

  );
};

export default Update;
