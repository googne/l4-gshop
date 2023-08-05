import React from 'react'
import { ListGroup } from 'react-bootstrap'
import MdButton from './MdButton'

const BlockButton = (props) => {
  return (
    <ListGroup.Item>
      <MdButton className='btn-block' {...props} />
    </ListGroup.Item>
  )
}

export default BlockButton
