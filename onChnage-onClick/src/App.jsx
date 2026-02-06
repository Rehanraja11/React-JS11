import React, { useState } from 'react'

const Events = () => {

  const [name,nameHandler] = useState('')
  return (
    <>
    <div>
      <h1>Hey Brothers</h1>
      <button  onDoubleClick={()=>{alert('cliked Me')}}>Click</button>
    </div>


    <div>
      <input 
      type="text"
      value={name}
      placeholder='Enter Username'
      onChange={(e)=>nameHandler(e.target.value)}
      />
      <h1>{name}</h1>
    </div>

    </>
  )
}

export default Events
