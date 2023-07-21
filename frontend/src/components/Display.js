import React from 'react'
import Message from './core/Message'
import Loader from './core/Loader'

const Display = ({
  loading,
  message: { error, success, empty, custom },
  childDisplay,
  children,
}) => {
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        children
      )}
      {/* {loading && <Loader />}
      {!loading && custom && <Message variant='warning'>{custom}</Message>}
      {!loading && empty && <Message variant='info'>No Data Found</Message>}
      {!loading && success && <Message variant='success'>{success}</Message>}
      {!loading && error && <Message variant='danger'>{error}</Message>}
      {childDisplay === 'force' ? children : !loading && !error && children} */}
    </>
  )
}

export default Display
