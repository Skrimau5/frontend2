import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import './Home.css'; // Asegúrate de importar el archivo CSS correctamente
import Kids from './Kids';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [adminKids, setAdminKids] = useState("");
  const [modalContent, setModalContent] = useState('');
  const [pin, setPin] = useState('');
  const [loggedForKids, setLoggedForKids] = useState(false);
  const [loggedForPlay, setLoggedForPlay] = useState(false);
  const [loggedForCollection, setLoggedForCollection] = useState(false);

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
        //login
      if (adminKids==="Kid") {
        setLoggedForKids(true);
      } 
      if(adminKids==="Play") {
        setLoggedForPlay(true);
      }
      if(adminKids==="List") {
        setLoggedForCollection(true);
      }
    } catch (error) {
      console.error('Error logging in child:', error.message);
    }
  };

  if (loggedForKids) {
    return <Navigate to="/adminKids" />;
  }
  if (loggedForPlay) {
    return <Navigate to="/adminPlaylist" />;
  }
  if (loggedForCollection) {
    return <Navigate to="/adminCollection" />;
  }

  return (
    <div >
      <nav>
        <Link className='buttonh' to="/" >Log out</Link>
        <button className='buttonh' onClick={() => openModal('Enter your pin', "Kid")}>Administration Kids</button>
        <button className='buttonh' onClick={() => openModal('Enter your pin', "Play")}>Administration Playlist</button>
        <button className='buttonh' onClick={() => openModal('Enter your pin', "List")}>Administration Collection</button>
        <div class="animation start-home"></div>
      </nav>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-contents" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{modalContent}</h2>
              <button className="close" onClick={closeModal}>Cerrar modal</button>
            </div>
            <input
              type="text"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Ingrese PIN"
            />
            <button className="login-button" onClick={handleSubmit}>Enviar</button>
          </div>
        </div>

      )}

      <Kids></Kids>
    </div>
  );
};

export default Home;
