import React from 'react'

export const Bienvenidad = ({ nombre }) => {
  return (
    <div className='flex justify-start items-center '>
        <span className='text-white font-light'>Bienvenido, {nombre}!</span>
    </div>
  )
}
