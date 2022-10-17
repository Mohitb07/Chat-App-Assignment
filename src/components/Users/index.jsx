import React from 'react'
import User from './User'

function Users() {
  return (
    <div className='h-full space-y-3 overflow-hidden'>
      <div className='space-y-3 p-10'>
        <h1 className='text-2xl font-semibold'>Chats</h1>
        <input type='text' className='rounded-full w-full px-6 py-3 outline-none' placeholder='Search or start a new chat' />
      </div>
      <div className='space-y-5 h-full px-10 overflow-y-auto'>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
      </div>
    </div>
  )
}

export default Users