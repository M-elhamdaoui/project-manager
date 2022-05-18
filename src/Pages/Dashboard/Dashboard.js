import React from 'react'
import ProjectsList from '../../Components/ProjectsList/ProjectsList';
import { useCollection } from '../../Hooks/useCollection'
import "./Dashboard.css"

function Dashboard() {
  const {documents,error}=useCollection("projects");

  return (
    <div>
      <h2 className='page-title' >Dashboard</h2>
      {error && <div className='error' >{error}</div>}
      {documents && <ProjectsList projects={documents} />}
    </div>
  )
}

export default Dashboard