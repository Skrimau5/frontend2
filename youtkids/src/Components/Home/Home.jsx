import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Childs from './Childs';
import './Home.css';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [adminKids, setAdminKids] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [pin, setPin] = useState('');
  const [loggedForKids, setLoggedForKids] = useState(false);
  const [loggedForPlay, setLoggedForPlay] = useState(false);

  const openModal = (content, type) => {
    setModalContent(content);
    setAdminKids(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/userLogin?_id=${localStorage.getItem("Id")}&pin=${pin}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error logging in child');
      }

      console.log('Child logged in successfully:', data);

      closeModal();

      if (adminKids) {
        setLoggedForKids(true);
      } else {
        setLoggedForPlay(true);
      }
    } catch (error) {
      console.error('Error logging in child:', error.message);
    }
  };

  if (loggedForKids) {
    return <Navigate to="/adminProfile" />;
  }
  if (loggedForPlay) {
    return <Navigate to="/adminPlaylist" />;
  }

  return (
    <div >
      <div className="admin-buttons">
        <button onClick={() => openModal('Enter your pin', true)}>Administration Kids</button>
        <button onClick={() => openModal('Enter your pin', false)}>Administration Playlist</button>
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>Cerrar modal</button>
            <h2>{modalContent}</h2>
            <input
              type="text"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Ingrese PIN"
            />
            <button onClick={handleSubmit}>Enviar</button>
          </div>
        </div>
      )}
      <Childs></Childs>
    </div>
  );
};

export default Home;