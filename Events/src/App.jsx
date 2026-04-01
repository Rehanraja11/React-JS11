import React from 'react'
import { useState } from 'react'

const App = () => {

   const [count,setCounter] = useState(0)
   
   const Addvalues = () => {
    setCounter(count+1)
   }
   const RemoveValues = () => {
    setCounter(count-1)
   }
   
   if(count<0){
    setCounter(0)
   }

  return (
    <div style={{textAlign:'center',margin:"50px"}}>
      <h1> Counter App </h1>
      <h3>Count Is : {count}</h3>
      <button onClick={Addvalues}>Add</button>
      <button onClick={RemoveValues}>Remove</button>
      <button onClick={()=> setCounter(0)}>Reset</button>
    </div>
  )
}

export default App
