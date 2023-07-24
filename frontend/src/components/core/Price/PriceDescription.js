import React from 'react'
import Price from './Price'

const PriceDescription = ({ qty, price }) => {
  return (
    <>
      {qty} X <Price value={price} /> = <Price value={qty * price} />
    </>
  )
}

export default PriceDescription
