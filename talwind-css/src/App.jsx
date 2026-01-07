
import { useState } from 'react'
import './App.css'

function App() {
  const [color, colorHandler] = useState('olive')


  return (
    <div className='w-full h-screen' style={{ backgroundColor: color }}>
      <div className='fixed flex flex-wrap justify-center  inset-x-0 px-2'>
        <div className='flex flex-wrap justify-center gap-3 shadow-lg bg-white px-4 py-3 rounded-2xl'>

          <button onClick={() => colorHandler("red")} className='outline-none px-4 py-1 rounded-full shadow-lg'
            style={{ backgroundColor: "red" }}
          >Red</button>

          <button onClick={() => colorHandler("green")} className='outline-none px-4 py-1 rounded-full shadow-lg'
            style={{ backgroundColor: "green" }}
          >Green</button>

          <button onClick={() => colorHandler("Blue")} className='outline-none px-4 py-1 rounded-full shadow-lg'
            style={{ backgroundColor: "Blue" }}
          >Blue</button>

          <button onClick={() => colorHandler("yellow")} className='outline-none px-4 py-1 rounded-full shadow-lg'
            style={{ backgroundColor: "yellow", color: "black" }}
          >Yellow</button>

          <button onClick={() => colorHandler("olive")} className='outline-none px-4 py-1 rounded-full shadow-lg'
            style={{ backgroundColor: "olive" }}
          >Olive</button>

          <button onClick={() => colorHandler("white")} className='outline-none px-4 py-1 rounded-full shadow-lg'
            style={{ backgroundColor: "white", color: 'black' }}
          >White</button>

          <button onClick={() => colorHandler("black")} className='outline-none px-4 py-1 rounded-full shadow-lg'
            style={{ backgroundColor: "black", }}
          >Black</button>
        </div>
      </div>
    </div>
  )
}

export default App
