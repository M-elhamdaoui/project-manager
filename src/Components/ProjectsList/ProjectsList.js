import React from 'react'
import "./ProjectsList.css"
import { Link } from 'react-router-dom'
import Avatar from "../Avatar/Avatar"

function ProjectsList({projects}) {
  return (
    <div className='project-list' >
      {projects.length===0 && <p>There is no projects</p>}
      {projects.map(project=>{
        return (
          <Link  to={`/projects/${project.id}`} key={project.id}>
            <h4>{project.name}</h4>
            <p>Due by {project.dueDate.toDate().toDateString()}</p>
              <div className="assigned-to">
            <ul>
                {project.assignedUsersList.map(user => (
                  <li key={user.photoURL} >
                    <Avatar src={user.photoURL} />
                  </li>
                ))}
            </ul>
              </div>
          </Link>
        );
      })}
    </div>
  )
}

export default ProjectsList