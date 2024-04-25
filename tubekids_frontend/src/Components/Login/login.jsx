import { useState, useEffect} from 'react';
import { Navigate} from 'react-router-dom';
import './Login.css';

const Login = () => {
  const userId=localStorage.getItem("Id");
  const save=localStorage.getItem("Save");
  const [key, setKey] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  //Activar Cuenta
  const Activate = () => {
  fetch(`http://localhost:3001/api/users?id=${userId}`, {
      method: 'PATCH', 
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to activate user');
        }
        return response.json();
      })
      .then(data => {
      })
      .catch(error => {
        console.error(error);
      });
    };
  
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const sendSMS = async (to) => {
    try {
      const response = await fetch('http://localhost:3001/api/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to,
          body:"Su código de verificación en TubeKids es:"+key
        })
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:3001/api/users?email=${formData.email}&password=${formData.password}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Error logging in');
      }

      const data = await response.json();
      console.log('User logged in successfully:', data);
      localStorage.setItem("Name", data.name);
      localStorage.setItem("Id", data._id);
      setError('');
      localStorage.setItem("Key", key);
      
// sendSMS(data.telefono);
      setLoggedIn(true);
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Error logging in. Please try again.');
    }
  };

  useEffect(() => {
    fetch('http://localhost:3001/api/key/')
      .then(response => response.json())
      .then(data => {
        setKey(data.key);
      })
      .catch(error => console.error('Error fetching key:', error));
  }, []);

  if (save) {
    Activate();
    localStorage.removeItem("Save")
  }

  if (loggedIn) {
    return <Navigate to="/loginpin" />;
  }


  return (
    <>
    <div className="wrapper">
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <h1>Sign in </h1>
        <div className='input-box'>
          <input className='input' type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleChange} required />
        </div>
        <div className='input-box'>
          <input className='input' type="password" name="password" placeholder="Password *" value={formData.password} onChange={handleChange} required />
        </div>
        <button className='button' type="submit">Login</button>
      </form>
    </div>
    </>
  );
};

export default Login;
