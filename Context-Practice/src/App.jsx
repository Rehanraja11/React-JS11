import React, { createContext, useContext, useState } from 'react'
const UserData = createContext()

const App = () => {
  const [user,userHandler] = useState("")
  return (
  <UserData.Provider  value={{user,userHandler}}>
    <div>
      <h1>Hey Context APi</h1>
      <Components1/>
    </div>
  </UserData.Provider>

  )
}
export default App


const Components1 = () => {
  return (
    <div>
      <h2>Components1</h2>
       <Components2/>
    </div>
  )
}

const Components2 = () => {
  return (
    <div>
      <h2>Components2</h2>
       <Components3/>
    </div>
  )
}


const Components3 = () => {
  return (
    <div>
      <h2>Components3</h2>
      <Components4/>
    </div>
  )
}



const Components4 = () => {
  return (
    <div>
      <h2>Components4</h2>
      <Components5/>
    </div>
  )
}


const Components5 = () => {
 
  const{user,userHandler} = useContext(UserData)

  return (
    <div>
      <input 
      type="text"
      value={user}
      placeholder='Enter Your Name'
      onChange={(e)=>userHandler(e.target.value)}
       />
      <h2>Components5 {user}</h2>
    </div>
  )
}






