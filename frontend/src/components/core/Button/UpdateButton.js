import React from 'react'
import { EDIT_ICON } from '../../../constants/iconConstants'
import MdButton from './MdButton'

const UpdateButton = (props) => {
  return (
    <MdButton
      type='submit'
      variant='primary'
      icon={EDIT_ICON}
      label='Update'
      {...props}
    />
  )
}

export default UpdateButton
