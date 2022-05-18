import React from 'react'
import { useCollection } from '../../Hooks/useCollection'
import Avatar from '../Avatar/Avatar';
import "./OnlineUsers.css"

function OnlineUsers() {
    
    
    const {documents,error}=useCollection("profile")
       
  return (
    <div className='user-list'>
      <h2>All users</h2>

      {error && <div className='error'>{error}</div>}
      {documents && documents.map((user)=>{
          return (
            <div key={user.id} className='user-list-item'>
              {user.online && <span className='online-user'></span>}

              <span>{user.displayName}</span>
              <Avatar src={user.photoURL} />
            </div>
          );
      })  }
    </div>
  );
}

export default OnlineUsers