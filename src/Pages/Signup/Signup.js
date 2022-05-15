import React,{useState} from 'react'
import { useSignup } from '../../Hooks/useSignup'
import "./Signup.css"

function Signup() {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [displayName,setDisplayName]=useState("")
  const [image,setImage]=useState(null);
  const [imageError,setImageError]=useState(null)

  const {error,isPending,signup}=useSignup()

 

  const handleFileChange=(e)=>{
    setImage(null);
    let selected=e.target.files[0]
    console.log(selected)

    if(!selected){
      setImageError("Please select a file")
      return
    }
    if(!selected.type.includes("image")){
      setImageError("The selected file most be an image");
      return
    }
    if(selected.size>100000){
      setImageError("Image file size most be less then 100kb")
      return
    }
    setImageError(null);
    setImage(selected);
    console.log("Image setted")
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    signup(email,password,displayName,image);
    
  }

  return (
    <form className='auth-form' onSubmit={handleSubmit} >
      <h2>Signu up</h2>
      <label>
        <span>Email :</span>
        <input type="email" required onChange={e=>setEmail(e.target.value) } value={email}  />
      </label>
      <label>
        <span>Password :</span>
        <input type="password" required onChange={e=>setPassword(e.target.value) } value={password}  />
      </label>
      <label>
        <span>Display Name :</span>
        <input type="text" required onChange={e=>setDisplayName(e.target.value) } value={displayName}  />
      </label>
      <label>
        <span>Profile pic:</span>
        <input type="file" required onChange={handleFileChange}  />
        {imageError && <div className='error' >{imageError}</div>}
      </label>
        {!isPending && <button className="btn" >Sign up</button> }
        {isPending && <button className="btn" disabled >Loading</button> }
        {error && <div className='error' >{error}</div>}
    
      
    </form>
  )
}

export default Signup