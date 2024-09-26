import React from 'react'

const ChatMessage = ({name, message}) => {
  return (
    <div className='flex items-center shadow-sm pb-1 mb-2'>
        <img className='h-8 cursor-pointer' src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" alt="user" />
        <span className='font-bold text-sm pr-2 pl-1'>{name}</span>
        <span className='text-xs'>{message}</span>
    </div>
  )
}

export default ChatMessage
