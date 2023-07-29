import React from 'react'
import { BACK_ICON } from '../../../constants/iconConstants'
import MdButton from './MdButton'

const BackButton = ({ onClick }) => {
  return (
    <MdButton
      onClick={onClick}
      variant='light'
      icon={BACK_ICON}
      label='Go Back'
    />
  )
}

export default BackButton
