import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Sidebar.css"
import DashboardIcon from "../../assets/dashboard_icon.svg"
import AddIcon from "../../assets/add_icon.svg"


function Sidebar() {
  return (
    <div className='sidebar' >
        <div className="sidebar-content">
            <div className="user">
                {/* Avatar and user name later */}
                <p>Hey user</p>
            </div>
            <nav className="links">
                <ul>
                    <li>
                          <NavLink  exact to="/" >
                              <img src={DashboardIcon} alt="dashboard icon" />
                              <span>Dashboard</span>
                          </NavLink>
                    </li>
                    <li>
                          <NavLink to="/create" >
                              <img src={AddIcon} alt="Add Project icon" />
                              <span>New project</span>
                          </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
  )
}

export default Sidebar