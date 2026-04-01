import React from 'react'
import { Link } from 'react-router-dom'

const Naavbaar = () => {
  return (
    <div style={{width:"100%",backgroundColor:"Gray", display:"flex",justifyContent:"space-between"}}>
      <h1>Appsile</h1>
      <div>
       <Link to="/">Home</Link>
       <Link to="/about">About</Link>
       <Link to="/contact">Contact</Link>
      </div>
    </div>
  )
}

export default Naavbaar
