import React from 'react'
import ButtonList from './ButtonList'
import VideoContainer from './VideoContainer'
import { useSelector } from 'react-redux'

const MainContainer = () => {

    const isMenuOpen = useSelector(store => store.app.isMenuOpen);
  return (
    <div style={{
        width: isMenuOpen ? 'calc(100vw - 210px)' : '100vw',
        transition: 'all 0.3s ease-in-out',
        marginLeft: isMenuOpen ? '12rem' : '0',
      }} className='overflow-hidden'>
      <ButtonList />
      <VideoContainer />
    </div>
  )
}

export default MainContainer
