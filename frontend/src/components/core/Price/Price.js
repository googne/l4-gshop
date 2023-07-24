import React from 'react'

const Price = ({ value }) => {
  //calculate Price
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  return (
    <>
      <span>${addDecimals(value)}</span>
    </>
  )
}

export default Price
