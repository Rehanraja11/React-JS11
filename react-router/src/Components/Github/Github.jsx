import React, { useState } from 'react'
import { useEffect } from 'react'

const Github = () => {
    const  [data ,dataHandler] = useState([])
    useEffect(()=>{
       fetch('https://api.github.com/users/Rehanraja11')
       .then(response => response.json())
       .then(data => {
        dataHandler(data)
       })
    },[])
  return (
    <div className='text-white text-center text-4xl bg-gray-600  p-10  rounded-4xl m-10 '>Github followers : {data.followers}
    <img src={data.avatar_url} alt="picture" />
    
    </div>
  )
}

export default Github