import React from 'react'
// import './loader.css'

export const Loader = () => {
  return (
    <div className='fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 backdrop-blur-sm'>
      <span className='w-2 h-2 rounded-full bg-white animate-ping'></span>
    </div>
  )
}
