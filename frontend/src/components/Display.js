import React from 'react'
import Message from '../components/Message'
import Loader from '../components/Loader'

const Display = ({
  loading,
  message: { error, success, empty, custom },
  childDisplay,
  children,
}) => {
  return (
    <>
      {loading && <Loader />}
      {!loading && custom && <Message variant='warning'>{custom}</Message>}
      {!loading && empty && <Message variant='info'>No Data Found</Message>}
      {!loading && success && <Message variant='success'>{success}</Message>}
      {!loading && error && <Message variant='danger'>{error}</Message>}
      {childDisplay === 'force' ? children : !loading && !error && children}
    </>
  )
}

export default Display
