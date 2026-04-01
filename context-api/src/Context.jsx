import React, { createContext, useState } from 'react'

const ThemeProvider = createContext()

const Context = ({children}) => {
    const [theme,setTheme] = useState("light")
  return (
    <ThemeProvider.Provider value={{theme,setTheme}}>
         {children}
    </ThemeProvider.Provider>
  )
}

export default Context
