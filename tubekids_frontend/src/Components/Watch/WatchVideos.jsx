import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';

const WatchVideos = () => {

    const [videos, setVideos] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/videos?id=${localStorage.getItem("IdView")}`);//Buscar video por coleccion
            if (!response.ok) {
                throw new Error('Error fetching videos');
            }
            const data = await response.json();
            setVideos(data);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="playlist-container">
            <Link className='buttonh' to="/home" >Home</Link>
            <Link className='buttonh' to="/watch" >Collections</Link>
            <ul>
                {videos.map(video => (
                    <li key={video._id}>
                        <p>Name: {video.name}</p>
                        <div>
                            <ReactPlayer
                                url={video.url}
                                loop
                                controls
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default WatchVideos