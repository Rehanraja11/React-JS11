import { useState } from 'react'

import './App.css'
import { useEffect } from 'react'

function App() {
  const [count, setCount] = useState(0)

  useEffect(()=>{
      (`You Cliked ${count} ` )
  },[count])

  return (
    <>
     <h1>My Counter</h1>
     <h2>Counter is :{count}</h2>
      <button onClick={()=>setCount(count+1)}>Click Me</button>
      <button onClick={()=>setCount(count-1)}>Don't Click</button>
      
    </>
  )
}

export default App
