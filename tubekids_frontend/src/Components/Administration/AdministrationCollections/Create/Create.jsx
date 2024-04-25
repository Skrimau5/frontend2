import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Create = () => {

    const [formData, setFormData] = useState({
        name: '',
        user: localStorage.getItem("Id"),
        videos: 0
    });

    const [boy, setBoy] = useState("");

    const [formDataChild, setFormDataChild] = useState({
        collection: '',
        children: ''
    });

    const [isCreated, setIsCreated] = useState(false);

    const [isAdd, setIsAdd] = useState(false);

    const [error, setError] = useState('');

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

    const handleAdd = async (id, name) => {
        setFormDataChild(prevState => ({
            ...prevState,
            children: id
        }));
        setIsAdd(true);
        setBoy(name);
    };

    const AddPerfil = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/subs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataChild)
            });
            window.alert(`Perfil${boy} suscrito a la colección. `)
            if (!response.ok) {
                throw new Error('Error creating playlist');
            }
        } catch (error) {
            console.error('Error creating playlist:', error);
            setError('Error creating playlist. Please try again later.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/api/collections', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            setIsCreated(true);
            if (!response.ok) {
                throw new Error('Error creating playlist');
            }


            const data = await response.json();
            console.log('Playlist created successfully:', data);
            setFormDataChild(prevState => ({
                ...prevState,
                collection: data._id
            }));
            setError('');
            setFormData({
                name: '',
                url: '',
                user: localStorage.getItem("Id")
            });
        } catch (error) {
            console.error('Error creating playlist:', error);
            setError('Error creating playlist. Please try again later.');
        }
    };
    if (isAdd) {
        AddPerfil()
    }

    useEffect(() => {
        fetchChildren();
    }, []);


    return (
        <div className="wrapper">
            <Link className='buttonh' to="/" >Log out</Link>
            <Link className='buttonh' to="/home" >Home</Link>
            <Link className='buttonh' to="/adminCollection" >Admin collections</Link>

            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <h1 >Create new collection</h1>

                <div className='input-box'>
                    <input className="input" type="text" name="name" placeholder="Name of collection*" value={formData.name} onChange={handleChange} required />
                </div>
                <button className="button" type="submit">Create collection</button>
            </form>
            <div className="child-list-containe">
                {isCreated &&
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
                                <button className='kid-button-del' onClick={() => handleAdd(child._id, child.name)}>Add to perfil</button>
                            </div>

                        ))}
                    </div>}
            </div>
        </div>
    )
}

export default Create