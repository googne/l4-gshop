import React from 'react'
import { CREATE_PRODUCT_ICON } from '../../../constants/iconConstants'
import MdButton from './MdButton'

const CreateButton = (props) => {
  const { name, label } = props
  return (
    <MdButton
      icon={CREATE_PRODUCT_ICON}
      label={label || `Create ${name}`}
      {...props}
    />
  )
}

export default CreateButton
