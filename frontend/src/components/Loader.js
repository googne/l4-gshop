import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = ({ size }) => {
  const xxlSize = size
    ? { marginRight: '0.5rem' }
    : {
        height: '100px',
        width: '100px',
        margin: 'auto',
        display: 'block',
      }

  return (
    <Spinner
      animation='border'
      role='status'
      size={size}
      style={{ ...xxlSize }}
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
  )
}

export default Loader
