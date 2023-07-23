import React from 'react'
import MdButton from './MdButton'

const BackButton = ({ onClick }) => {
  return (
    <MdButton
      onClick={onClick}
      variant='light'
      icon='arrow-left'
      label='Go Back'
    />
  )
}

export default BackButton
