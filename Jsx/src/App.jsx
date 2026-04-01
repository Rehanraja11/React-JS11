import React from 'react'

const App = () => {
  const Website = "WEB DEVLOPMENT"
  const Price = 11111
  const isAvilable = true
  return (
    <div>
      <h1>Appsile Coder's BootCamp</h1>
      <h2>Website  : {Website}</h2>
      <h2>Website Price : {Price}</h2>

    <p>
      Status : {isAvilable?"Yes":"No"}
    </p>
    </div>
  )
}

export default App
