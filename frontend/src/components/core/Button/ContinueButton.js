import React from 'react'
import { CONTINUE_ICON } from '../../../constants/iconConstants'
import SubmitButton from './SubmitButton'

const ContinueButton = () => {
  return <SubmitButton icon={CONTINUE_ICON} iconRight='true' label='Continue' />
}

export default ContinueButton
