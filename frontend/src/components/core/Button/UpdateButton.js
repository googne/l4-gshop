import React from 'react'
import { EDIT_ICON } from '../../../constants/iconConstants'
import SubmitButton from './SubmitButton'

const UpdateButton = (props) => {
  return <SubmitButton icon={EDIT_ICON} label='Update' {...props} />
}

export default UpdateButton
