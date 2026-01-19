import React from 'react'

import { useParams } from 'react-router-dom'

const User = () => {
    const {userid} = useParams()
  return (
    <div className='bg-gray-700 text-white text-3xl p-10 m-5 text-center rounded-2xl'>User : {userid}</div>
  )
}

export default User