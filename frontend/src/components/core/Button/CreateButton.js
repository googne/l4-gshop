import React from 'react'
import MdButton from './MdButton'

const CreateButton = (props) => {
  const { name, label } = props
  return (
    <MdButton icon='plus-circle' label={label || `Create ${name}`} {...props} />
  )
}

export default CreateButton
