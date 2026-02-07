import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const App = () => {
 
  const [count,conuterHandler] = useState(0)

  useEffect(()=>{
    console.log(count)
  })


  return (
    <div>
      <h1>Conter App</h1>
      <h2>Conter is : {count} </h2>
      <button onClick={()=>conuterHandler(count+1)}>Click</button>
    </div>

  )
}

export default App