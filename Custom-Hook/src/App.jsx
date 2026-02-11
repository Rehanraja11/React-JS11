import useCounter from './CustomHook/CustomHook.jsx'
import './App.css'

function App() {
  

  const {counter,increment,decrement,reset}=useCounter(0)



  return (
    <>
    <div>
       <h1>Custom Hooks</h1>
       <h2>Counter is : {counter}</h2>
       <button onClick={increment}>+</button>
       <button onClick={decrement}>-</button>
       <button onClick={reset}>Reset</button>
    </div>
 
      
    </>
  )
}

export default App
