import React from 'react'
import { Button } from 'react-bootstrap'
import Loader from '../Loader'

const MdButton = ({
  className,
  label,
  icon,
  variant,
  onClick,
  disabled,
  loader,
  type,
  iconRight,
}) => {
  const btnProps = { className: className || 'my-3', variant, onClick, type }
  return (
    <Button {...btnProps} disabled={disabled === 0}>
      {loader && <Loader size='sm' />}
      {!iconRight && <i className={`${icon} mr-1`} />}
      {label}
      {iconRight && <i className={`${icon} ml-1`} />}
    </Button>
  )
}

export default MdButton
