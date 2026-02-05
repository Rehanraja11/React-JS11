
import React, { useState } from 'react';
import { ThemeContext } from './ContextData';
import MyComponent from './MyComponent';

function App() {
  const [theme, setTheme] = useState('light'); 

  return (
    
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div>
        <MyComponent />
        
      </div>
    </ThemeContext.Provider>
  );
}

export default App;