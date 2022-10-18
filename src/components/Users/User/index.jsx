import React from 'react'

function User() {
  return (
    <div className='hover:opacity-70 transition-opacity ease-in-out duration-300 cursor-pointer'>
        <div className='flex items-center space-x-5'>
            <img className='h-16 w-16 object-cover rounded-full border-2 border-violet-400 p-1' src="https://www.organicwebs.com.au/images/FAQ/facebook_profile_scam/Identity_Crook.jpg" alt="placeholder" />
            <p className='font-semibold text-lg'>Group 1</p>
        </div>
    </div>
  )
}

export default User