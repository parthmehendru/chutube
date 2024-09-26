import React from 'react'
import Button from './Button'
import { useNavigate } from 'react-router-dom'

const ButtonList = () => {
  const navigate = useNavigate();
  return (
    <div className='mt-3 flex overflow-x-scroll scrollbar-hide whitespace-nowrap scroll-smooth'>

      <div onClick={()=> navigate('/search/live')}><Button name="Live"/></div>
      <Button name="Gaming"/>
      <Button name="Comedy"/>
      <Button name="Cricket"/>
      <Button name="Dogs"/>
      <Button name="Football"/>
      <Button name="News"/>
      <Button name="Cooking"/>
      <Button name="Valentine"/>
      <Button name="Baseball"/>
      <Button name="Standup"/>
      <Button name="Starc"/>
      <Button name="Kohli"/>
      <Button name="Ponting"/>
      <Button name="Badminton"/>
      <Button name="Olympics"/>
      <Button name="Nutrition"/>
    </div>
  )
}

export default ButtonList
