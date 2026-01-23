import React ,{useState,useContext} from 'react'
import UserContext from '../Context/UserContext'


const Login = () => {

    const [username,setUsername] = useState('')
    const [passWord,setPassword] = useState('')

    
  const {setUser} = useContext(UserContext)







    const handleSubmit=(e)=>{
      e.preventDefault()
      setUser({username,passWord})

    }

  return (
    <div>       
        <h2>Login</h2>
        <input type="text" 
        placeholder='Username'
        value={username}
        onChange={(e)=> setUsername(e.target.value)}

        />

        <input type="text" 
        placeholder='PassWord'
        value={passWord}
        onChange={(e)=> setPassword(e.target.value)}

        />
        <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Login