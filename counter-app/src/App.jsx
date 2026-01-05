import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)



  const addValues = () => {
    setCount(count + 1)
    console.log(count)
  }

  const removeValues = () => {
    setCount(count - 1)
    console.log(count)
  }

  const restartValues = () => {
    setCount(0)
  }

  if (count < 0) {
    setCount(0)
  }
  return (
    <>
      <h1 id='heder'>Counter ~ App</h1>
      <div id='counterappp'>
        <img src="https://t4.ftcdn.net/jpg/02/34/23/43/360_F_234234309_eIDFeiaYSQNpf3FvpxikWVFBvhvAQ7hu.jpg" width={500} height={300} alt="" />
        <h3 id='countervalues'>Count Values : {count}</h3>

        <button onClick={addValues}>Add+</button>
        <button onClick={removeValues}>Remove-</button>
        <button id='firstbtn' onClick={restartValues}>Restart</button>
      </div>

    </>
  )
}

export default App
