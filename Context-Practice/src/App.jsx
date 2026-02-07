import React, { createContext,  useContext,  useState } from 'react'


const UserData = createContext()

const App = () => {
  
const [user,userHandler] = useState("")

  return (
    <UserData.Provider  value={{user,userHandler}}>
     <h1>Hey How Are Uou</h1>
     <Components1/>
    </UserData.Provider>
  )
}

export default App



const Components1=() => {
  return (
    <div>
      <h1>Components1</h1>
      <Components2/>
    </div>
  )
}

const Components2=() => {
  const {user} = useContext(UserData)
  return (
    <div>
      <h1>Components2 :{user }</h1>
      <Components3/>
    </div>
  )
}


const Components3=() => {
  return (
    <div>
      <h1>Components3</h1>
      <Components4/>
    </div>
  )
}


const Components4=() => {
  return (
    <div>
      <h1>Components4</h1>
      <Components5/>
    </div>
  )
}
const Components5=() => {
  const {user,userHandler} = useContext(UserData)
  return (
    <div>
      <input 
      type="text"
      placeholder='Enter Your Username'
      value={user}
      onChange={(e)=>userHandler(e.target.value)}
      />

      <h1>Components5 :{user}</h1>
    </div>
  )
}


