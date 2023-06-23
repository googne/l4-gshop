import React from 'react'
import Message from '../components/Message'
import Loader from '../components/Loader'

const Display = ({ loading, error, children }) => {
  return (
    <>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {!loading && !error && children}
    </>
  )
}

export default Display
