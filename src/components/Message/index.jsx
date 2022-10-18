import React, { useState } from 'react';
const { convert } = require('html-to-text');

function Message({id = "", message, time}) {
  console.log('message', message)
  let isSelf = id === 7
  const formattedText = convert(message)
  return (
    <div className={`m-4 font-normal p-2 rounded-xl flex flex-col bg-[#056162] text-white w-1/2 ${isSelf && "self-end"}
    min-w-[7vw] w-fit max-w-[30vw]`}>
        <span className='text-violet-400 font-semibold'>Mohit Bisht</span>
        {formattedText}
        <span className='text-[10px] ml-auto font-semibold'>{time}</span>
    </div>
  )
}

export default Message