import React, { useState, useEffect } from 'react';
import './Modal.css';
import { Link } from 'react-router-dom';

const AdministrationKids = () => {
  const [children, setChildren] = useState([]);

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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/childrens?id=${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error deleting child');
      }
      fetchChildren();
    } catch (error) {
      console.error('Error deleting child:', error);
    }
  };

  // Función para guardar los datos del niño seleccionado en el localStorage y redirigir a la página de edición
  const handleEdit = (child) => {
    localStorage.setItem('childToEdit', JSON.stringify(child)); // Guardar los datos del niño en el localStorage
    window.location.href = '/createEditProfile'; // Redirigir a la página de edición
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  return (
    <div >
      
      <Link className='buttonh' to="/" >Log out</Link>
      <Link className='buttonh' to="/home" >Home</Link>
      <Link to="/createNewProfile">
        <button className='buttonh'>Create new profile</button>
      </Link>
      <h2>Children</h2>
      <div className="child-list-containe">
      <div className="child-container">
        {children.map(child => (
          <div className="child-card" key={child._id}>
            <img
              className="child-avatar"
              src={child.avatar}
              alt='avatar'
            />
            <div className="child-details">
              <p className="child-name">Name: {child.name}</p>
              <p className="child-age">Age: {child.age}</p>
            </div>
            <button className='kid-button-del' onClick={() => handleDelete(child._id)}>Delete</button>
            <button className='kid-button-upd' onClick={() => handleEdit(child)}>Edit profile</button>
          </div>
          
        ))}
      </div>
    </div>
    </div>
  );
};

export default AdministrationKids;
