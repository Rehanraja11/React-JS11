import React, { useEffect, useState } from 'react'

const Github = () => {
    const [data,dataHandler] = useState([])
    useEffect(()=>{
        fetch('https://api.github.com/users/rehanraja11')
        .then(response => response.json())
        .then(data =>{
            dataHandler(data)
        })
})
  return (
    <div className='bg-gray-700 p-10 text-white text-center text-2xl'>Github Followers :{data.followers}</div>
  )
}

export default Github