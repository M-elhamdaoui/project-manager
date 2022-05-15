import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"
import Temple from "../../assets/temple.svg"
import {useLogout} from "../../Hooks/useLogout"

function Navbar() {
    const {isPending,error,logout}=useLogout();

    return (
      <div className='navbar'>
        <ul>
          <li className='logo'>
            <img src={Temple} alt='Project manager' />
            <span>Project manager</span>
          </li>
          <li>
            <Link to='/login'>Login</Link>{" "}
          </li>
          <li>
            <Link to='/signup'>Signup</Link>
          </li>
          <li>
            {isPending && (
              <button disabled className='btn' >
                Loging out
              </button>
            )}
            {!isPending && (
              <button className='btn' onClick={logout}>
                Logout
              </button>
            )}
          </li>
        </ul>
      </div>
    );
}

export default Navbar