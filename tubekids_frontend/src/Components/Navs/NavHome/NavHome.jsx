import React from 'react'
import { Link } from 'react-router-dom';

const NavHome = () => {
  return (
    <><nav>
            <Link to="/home" >Log out</Link>
            <div class="animation start-home"></div>
        </nav></>
  )
}

export default NavHome