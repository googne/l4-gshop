import React from 'react'
import { ListGroup } from 'react-bootstrap'
import MdButton from './MdButton'

const BlockButton = (props) => {
  const { disabled } = props
  return (
    <ListGroup.Item>
      <MdButton
        className='btn-block'
        disabled={disabled || disabled === 0}
        {...props}
      />
    </ListGroup.Item>
  )
}

export default BlockButton
