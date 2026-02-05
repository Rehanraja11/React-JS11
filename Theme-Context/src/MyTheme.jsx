import React from 'react'
import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'

const MyTheme = () => {
    const toggleBtn=()=>{  
        setTheme(prevTheme => ((prevTheme === 'light' ? 'dark' : 'light')) )
        
    }
    const {theme ,setTheme} = useContext(ThemeContext)
  return (
   <div style={{background:theme === 'light' ? 'white' : 'black',color:theme ==='light'?'black':'white'}}>
    <h1>Current Theme {theme}</h1>
    <button onClick={toggleBtn}>
        Toggle Theme {theme}
    </button>

   </div>
  )
}

export default MyTheme