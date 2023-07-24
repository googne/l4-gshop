import React from 'react'

const Date = ({ value }) => {
  return (
    <>
      <span>{value.substring(0, 10)}</span>
    </>
  )
}

export default Date
