// This Is the useState Hooks

import { useState } from 'react';
import './App.css'

function App() {

  const [counter, setCounter] = useState(0)

  const Increment = () => {
    setCounter(counter + 1)

  }

  return (
    <button onClick={Increment}>Counter is : {counter}</button>
  )
}

export default App
