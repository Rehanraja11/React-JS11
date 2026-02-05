
import React, { useContext } from 'react';
import { ThemeContext } from './ContextData';

function MyComponent() {

  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div style={{ background: theme === 'light' ? 'white' : 'black', color: theme === 'light' ? 'black' : 'white' }}>
      <h1>Current Theme: {theme}</h1>
      <button onClick={toggleTheme}>
        Toggle Theme 
      </button>
    </div>
  );
}

export default MyComponent;
