import { useState} from 'react';
import { Navigate} from 'react-router-dom';

const LoginPin = () => {
    const key=localStorage.getItem("Key");
    const [pin, setPin] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handlePinChange = (e) => {
        setPin(e.target.value);
      };
    
      // Función para enviar el pin
      const handlePinSubmit = async (e) => {
        e.preventDefault();
        if(key===pin){
            setLoggedIn(true);
        }
      };
      if (loggedIn) {
        return <Navigate to="/home" />;
      }

    return (
        <>
            <div>
            <form onSubmit={handlePinSubmit}>
                <div className='input-box'>
                    <input className='input' type="text" placeholder="Pin" value={pin} onChange={handlePinChange} />
                </div>
                <button className='buttonpo' type="submit" >Enviar Pin</button>
            </form>
            </div>
        </>
    )
}

export default LoginPin