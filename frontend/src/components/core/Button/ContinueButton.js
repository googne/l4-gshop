import React from 'react'
import { CONTINUE_ICON } from '../../../constants/iconConstants'
import MdButton from './MdButton'

const ContinueButton = () => {
  return (
    <MdButton
      type='submit'
      variant='primary'
      icon={CONTINUE_ICON}
      iconRight='true'
      label='Update'
    />
  )
}

export default ContinueButton
