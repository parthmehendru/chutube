import React from 'react'

const Button = ({name}) => {
  return (
    <div>
      <button className='px-4 mx-2 my-1 py-2 rounded-full bg-slate-200'>{name}</button>
    </div>
  )
}

export default Button
