import React from 'react'
import Paragraph from '../Paragraph'
import Price from './Price'

const PriceList = ({ data }) => {
  const getAttr = (val) => {
    let text = val.replace('Price', '')
    return text.slice(0, 1).toUpperCase() + text.slice(1, text.length)
  }

  const priceData = Object.keys(data).reduce(
    (output, key) =>
      key.toLowerCase().indexOf('price') === -1
        ? output
        : { ...output, [getAttr(key)]: data[key] },
    {}
  )

  return (
    <>
      {Object.entries(priceData).map(([key, value]) => (
        <Paragraph listItem='true' key={key} heading={key}>
          <Price value={value} />
        </Paragraph>
      ))}
    </>
  )
}

export default PriceList
