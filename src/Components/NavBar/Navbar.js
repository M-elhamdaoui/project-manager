import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"
import Temple from "../../assets/temple.svg"

function Navbar() {
    return (
        <div className='navbar' >
            <ul>
                <li className="logo">
                    <img src={Temple} alt="Project manager" />
                    <span>Project manager</span>
                </li>
                <li><Link to="/login" >Login</Link> </li>
                <li><Link to="/signup" >Signup</Link></li>
                <li>
                    <button className='btn' >Logout</button>
                </li>
            </ul>
        </div>
    )
}

export default Navbar