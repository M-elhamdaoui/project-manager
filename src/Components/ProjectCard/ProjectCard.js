import React from 'react'
import "./ProjectCard.css"

function ProjectCard({data}) {
  return (
    <div className='card'  > 
        {data.name}
    </div>
  )
}

export default ProjectCard