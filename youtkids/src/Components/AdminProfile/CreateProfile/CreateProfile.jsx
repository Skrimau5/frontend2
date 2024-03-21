import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './CreateProfile.css';

const CreateProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    pin: '',
    avatar: '', // Elimina avatar del estado inicial
    age: '',
    user: localStorage.getItem("Id")
  });
  const [profileCreated, setProfileCreated] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Error creating child');
      }

      const data = await response.json();
      console.log('Child created successfully:', data);
      setError('');

      setFormData({
        name: '',
        pin: '',
        avatar: '',
        age: '',
        user: localStorage.getItem("Id")
      });
      setSelectedAvatar("");
      setProfileCreated(true)
    } catch (error) {
      console.error('Error creating child:', error);
      setError('Error creating child. Please try again later.');
    }
  };

  if (profileCreated) {
    return <Navigate to="/adminProfile" />;
  }


  return (
    <>
      <h2 className="create-title">Crear Nuevo Perfil</h2>
      {error && <div className="error-message">{error}</div>}
      <form className="create-form" onSubmit={handleSubmit}>
        <input className="create-input" type="text" name="name" placeholder="Name *" value={formData.name} onChange={(e) => setFormData(prevData => ({ ...prevData, name: e.target.value }))} required />
        <input className="create-input" type="text" name="pin" placeholder="PIN *" value={formData.pin} onChange={(e) => setFormData(prevData => ({ ...prevData, pin: e.target.value }))} required />
        {selectedAvatar && <img className="create-avatar" src={selectedAvatar} alt="Selected Avatar" />}
        <button className="create-button" type="button" onClick={openModal}>Seleccionar Avatar</button>
        <input className="create-input" type="number" name="age" placeholder="Age *" value={formData.age} onChange={(e) => setFormData(prevData => ({ ...prevData, age: e.target.value }))} required />
        <button className="create-button" type="submit">Crear Perfil</button>
      </form>
      {isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>Cancelar</button>
            <h2>Seleccionar la Imagen del Avatar</h2>
            <div className="image-container">
              {imageLinks.map((imageLink, index) => (
                <img
                  key={index}
                  className="create-avatar"
                  src={imageLink}
                  alt={`Imagen ${index + 1}`}
                  onClick={() => handleImageClick(imageLink)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Volver a la pagina anterior */}
      <Link to="/AdminProfile">
        <button className='return-button'>Volver</button>
      </Link>
    </>

  )
}

export default CreateProfile