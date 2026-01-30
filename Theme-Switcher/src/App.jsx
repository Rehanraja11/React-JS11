
import { useState } from 'react'
import './App.css'
import { ThemeProvider } from './contexts/theme'
import { useEffect } from 'react'
import ThemeBtn from './components/ThemeBtn'
import Card from './components/Card '

function App() {
  
  const [themMode , SetThemeMode] = useState('light')

  const lightTheme = () => {
    SetThemeMode("light")
  }
   const darkTheme = () => {
    SetThemeMode("dark")
  }

  // Actual Chnage Theme 
       
  useEffect(()=>{
    document.querySelector('html').classList.remove('light','dark')
    document.querySelector('html').classList.add(themMode)
  },[themMode])

  return (
    <ThemeProvider value={{themMode,lightTheme,darkTheme}}>
    
    <div className="flex flex-wrap min-h-screen items-center">
                  <div className="w-full">
                      <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
                        <ThemeBtn/>
                      </div>

                      <div className="w-full max-w-sm mx-auto">
                       <Card/>
                      </div>
                  </div>
              </div>
    </ThemeProvider>
  )
}

export default App
