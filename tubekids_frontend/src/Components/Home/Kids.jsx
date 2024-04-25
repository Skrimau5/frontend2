import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import './Kids.css';

const Kids = () => {
  const [children, setChildren] = useState([]);
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [pin, setPin] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const[logIn, setLogIn]= useState(false);

  const fetchChildren = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/childrens?id=${localStorage.getItem("Id")}`);
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
      const response = await fetch(`http://localhost:3001/api/childrenLogin?id=${selectedChildId}&pin=${pin}`);
      if (!response.ok) {
        throw new Error('Error logging in child');
      }
      const data = await response.json();
      console.log('Child logged in successfully:', data);
      localStorage.setItem("IdChild", data._id)
      setIsOpen(false); 
      setPin("");
      setLogIn(true);
    } catch (error) {
      console.error('Error logging in child:', error);
    }
  };

  if (logIn) {
    return <Navigate to="/watch" />;
  }

  return (
    <div className="child-list-container">
      <div className="child-container">
        {children.map(child => (
          <div className="child-card" key={child._id}>
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
          </div>
        ))}
      </div>
      {isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-contents" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Type your pin</h2>
              <button className="close" onClick={closeModal}>Cerrar modal</button>
            </div>
            <div className="modal-header">
            <input
              type="text"
              placeholder="Ingrese PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
            <button className="login-button" onClick={handleLogin}>Enviar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default Kids;
