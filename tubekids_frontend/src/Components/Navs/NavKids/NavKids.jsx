import React from 'react'
import { Link } from 'react-router-dom';
import './NavKids.css'

const NavKids = () => {
    return (
        <><nav className='nav'>
            <Link className='a' to="/home" >Log out</Link>
            <div class="animation start-home"></div>
        </nav></>
    )
}

export default NavKids