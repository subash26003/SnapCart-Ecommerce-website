import React from 'react'
import {assets} from "../assets/assets"

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-10 justify-between'>
        <img className='w-[max(10%,80px)]' src={assets.logo} alt='' />
        <button onClick={() => setToken("")} className='bg-gray-600 text-whhite px-5 py-2 sm:px-7 sm:py-3 rounded-full text-xs sm:text-sm '>Logout</button>
    </div>
  )
}

export default Navbar