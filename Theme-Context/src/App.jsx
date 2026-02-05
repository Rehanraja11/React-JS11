import { ThemeContext } from './ThemeContext'
import './App.css'
import { useState } from 'react'
import MyTheme from './myTheme'

function App() {
   const [theme,setTheme] = useState('light')

  return (
    <ThemeContext.Provider value={{theme,setTheme}}>
      <div >
        <MyTheme/>
      </div>
    </ThemeContext.Provider>
  )
}

export default App
