import React from 'react'
import { useState } from 'react'
import {useLogin} from "../../Hooks/useLogin"
import "./Login.css"

function Login() {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const { login, error, isPending } = useLogin();

  const submitHandle=(e)=>{
    e.preventDefault()
    login(email,password);
  }
  return (
    <form className='login-form' onSubmit={submitHandle} >
          <h2>Login</h2>
        <label>
          <span>Email</span>
          <input
            type='email'
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          <span>password</span>
          <input
            type='password'
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
      {!isPending&&<button  className='btn'>Login</button>}
      {isPending&&<button  className='btn' disabled>Loading</button>}
      {error && <div className='error' >{error}</div>}
    </form>
  );
}

export default Login