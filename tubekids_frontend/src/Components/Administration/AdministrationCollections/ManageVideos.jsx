import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ManageVideos = () => {

    const [children, setChildren] = useState([]);

    const [boy, setBoy] = useState("");

    const [isAdd, setIsAdd] = useState(false);

    const [formDataChild, setFormDataChild] = useState({
        collection: localStorage.getItem("IDcollection"),
        children: ''
    });

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
            console.log('Error creating playlist. Please try again later.');
        }
    };

    if (isAdd) {
        AddPerfil()
    }

    useEffect(() => {
        fetchChildren();
    }, []);

    return (
        <>
            <div className="wrapper">
                <Link className='buttonh' to="/" >Log out</Link>
                <Link className='buttonh' to="/home" >Home</Link>
                <Link className='buttonh' to="/adminCollection" >Admin collections</Link>
            </div>
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
                            <button className='kid-button-del' onClick={() => handleAdd(child._id, child.name)}>Add to perfil</button>
                        </div>

                    ))}
                </div>
            </div>
        </>
    )
}

export default ManageVideos