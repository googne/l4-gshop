import React from 'react'
import { Button } from 'react-bootstrap'
import Loader from '../Loader'

const MdButton = ({ className, label, icon, variant, onClick, loader }) => {
  const btnProps = { className: className || 'my-3', variant, onClick }
  return (
    <Button {...btnProps}>
      {loader && <Loader size='sm' />}
      <i className={`fas fa-${icon} mr-1`} />
      {label}
    </Button>
  )
}

export default MdButton
