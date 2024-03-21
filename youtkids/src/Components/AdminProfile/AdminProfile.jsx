import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminProfile.css';

const AdminProfile = () => {
  const [children, setChildren] = useState([]);

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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/profiles?id=${id}`, {
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
    window.location.href = '/editProfile'; // Redirigir a la página de edición
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  return (
    <div className="children-container">
      <h2>Niño</h2>
      <Link to="/createProfile">
        <button>Crear Nuevo Perfil</button>
      </Link>
      <ul className="child-list">
        {children.map(child => (
          <li className="child-item" key={child._id}>
            <img
              className="child-avatar"
              src={child.avatar}
              alt='avatar'
            />
            <div className="child-details">
              <p className="child-name">Nombre: {child.name}</p>
              <p className="child-age">Edad: {child.age}</p>
              <p className="child-pin">PIN: {child.pin}</p>
            </div>
            <button onClick={() => handleDelete(child._id)}>Eliminar</button>
            <button onClick={() => handleEdit(child)}>Editar Perfil</button>
          </li>
        ))}
      </ul>
      {/* Volver a la pagina anterior */}
      <Link to="/home">
        <button className='return-button'>Volver</button>
      </Link>
    </div>
  );
};

export default AdminProfile;