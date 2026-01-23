import React,{useState,useContext,}from 'react'
import UserContext from '../Context/UserContext'

const Login = () => {
    const [username,usernameHandler] = useState('')
    const [Password,PasswordHandle] = useState('')

    const {userHandler} = useContext(UserContext)

    const handleSubmit =(e)=>{

        e.preventDefault()
        userHandler({username,Password})
    }

  return (
    <div>
        <h2>Login</h2>
        <input type='text'
        value={username}
        onChange={(e)=>usernameHandler(e.target.value)}
        placeholder='Username'/>
        <input type='text' 
        value={Password}
        onChange={(e)=>PasswordHandle(e.target.value)}
        placeholder='Password'/>
        <button onClick={handleSubmit}>Submit</button>
      
    </div>
  )
}

export default Login
