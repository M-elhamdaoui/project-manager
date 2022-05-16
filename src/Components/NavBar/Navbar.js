import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"
import Temple from "../../assets/temple.svg"
import {useLogout} from "../../Hooks/useLogout"
import { useAuthContext } from '../../Hooks/useAuthContext'

function Navbar() {
    const {isPending,error,logout}=useLogout();
    const {user}=useAuthContext()

    return (
      <div className='navbar'>
        <ul>
          <li className='logo'>
            <img src={Temple} alt='Project manager' />
            <span>Project manager</span>
          </li>
          {!user && (
            <>
              <li>
                <Link to='/login'>Login</Link>{" "}
              </li>
              <li>
                <Link to='/signup'>Signup</Link>
              </li>
            </>
          )}
          <li>
            {isPending && user && (
              <button disabled className='btn'>
                Loging out
              </button>
            )}
            {!isPending && user && (
              <button className='btn' onClick={logout}>
                Logout
              </button>
            )}
            {error && console.log(error)}
          </li>
        </ul>
      </div>
    );
}

export default Navbar