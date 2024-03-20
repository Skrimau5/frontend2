import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Childs.css';

const Kids = () => {
  const [children, setChildren] = useState([]);
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [pin, setPin] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [logIn, setLogIn] = useState(false);

  const fetchChildren = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/profiles?id=${localStorage.getItem("Id")}`);
      if (!response.ok) {
        throw new Error('Error fetching children');
      }
      const data = await response.json();
      setChildren(data);
    } catch (error) {
      console.error('Error fetching children:', error);
    }
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  const openModal = (childId) => {
    setSelectedChildId(childId);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/profileLogin?id=${selectedChildId}&pin=${pin}`);
      if (!response.ok) {
        throw new Error('Error logging in child');
      }
      const data = await response.json();
      console.log('Child logged in successfully:', data);
      setIsOpen(false);
      setPin("");
      setLogIn(true);
    } catch (error) {
      console.error('Error logging in child:', error);
    }
  };

  if (logIn) {
    return <Navigate to="/view" />;
  }

  return (
    <div>
      <ul className="child-list">
        {children.map(child => (
          <li className="child-item" key={child._id}>
            <img
              className="child-avatar"
              src={child.avatar}
              alt='avatar'
              onClick={() => openModal(child._id)}
            />
            <div className="child-details">
              <p className="child-name">Name: {child.name}</p>
              <p className="child-age">Age: {child.age}</p>
            </div>
          </li>
        ))}
      </ul>
      {isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>Cerrar modal</button>
            <h2>Iniciar sesión</h2>
            <input
              type="text"
              placeholder="Ingrese PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
            <button onClick={handleLogin}>Enviar</button>
          </div>
        </div>
      )}
      {/* Volver a la pagina anterior */}
      <Link to="/login">
        <button className='return-button'>Volver</button>
      </Link>
    </div>
  );
};

export default Kids;