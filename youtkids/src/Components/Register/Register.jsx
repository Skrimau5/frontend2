import React, { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    repeatPassword: '',
    pin: '',
    name: '',
    lastname: '',
    country: '',
    fechaNacimiento: ''
  });

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
    console.log(formData);
    try {
      const response = await fetch('http://localhost:3001/api/users', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Error creating user');
      }

      const data = await response.json();
      console.log('User registered successfully:', data);
      setError('');
 
      setFormData({
        email: '',
        password: '',
        repeatPassword: '',
        pin: '',
        name: '',
        lastname: '',
        country: '',
        fechaNacimiento: ''
      });
    } catch (error) {
      console.error('Error registering user:', error);
      setError('Error registering user. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password *" value={formData.password} onChange={handleChange} required />
        <input type="password" name="repeatPassword" placeholder="Repeat Password" value={formData.repeatPassword} onChange={handleChange} />
        <input type="text" name="pin" placeholder="PIN (6 digits) *" value={formData.pin} onChange={handleChange} required />
        <input type="text" name="name" placeholder="Name *" value={formData.name} onChange={handleChange} required />
        <input type="text" name="lastname" placeholder="Lastname *" value={formData.lastname} onChange={handleChange} required />
        <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
        <input type="date" name="fechaNacimiento" placeholder="Fecha de Nacimiento *" value={formData.fechaNacimiento} onChange={handleChange} required />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}

export default Register;