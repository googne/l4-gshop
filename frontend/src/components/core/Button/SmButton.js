import React from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'

const SmButton = ({ icon, title, className, variant, onClick }) => {
  const btnProps = { className, variant, onClick }
  const tooltipId = 'tooltip-' + variant

  return (
    <>
      <OverlayTrigger
        placement='top'
        overlay={<Tooltip id={tooltipId}>{title}</Tooltip>}
      >
        <Button {...btnProps}>
          {icon && <i className={`fas fa-${icon}`}></i>}
        </Button>
      </OverlayTrigger>
    </>
  )
}
SmButton.defaultProps = {
  className: 'btn-sm',
  variant: 'light',
}

export default SmButton
