import React, { useState, useEffect } from 'react'

const Rating = ({ value, text }) => {
  const [color, setColor] = useState('#fcba03')

  useEffect(() => {
    if (value) {
      if (value <= 2) {
        setColor('red')
      } else if (value <= 4) {
        setColor('#fcba03')
      } else {
        setColor('#198754')
      }
    }
  }, [value])

  return (
    <div className='rating'>
      {[1, 2, 3, 4, 5].map((e, i) => (
        <span key={i}>
          <i
            style={{ color }}
            className={
              value >= i + 1
                ? 'fas fa-star'
                : value >= i + 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          />
        </span>
      ))}
      <div>{text && text}</div>
    </div>
  )
}

Rating.defaultProps = {
  color: '#fcba03',
}

export default Rating
