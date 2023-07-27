import React from 'react'

const StatusIcon = ({ condition, circle, children }) => {
  const color = condition ? 'green' : 'red'
  return (
    <>
      {children && condition ? (
        children
      ) : (
        <i
          className={`fa fa-${condition ? 'check' : 'times'}${
            circle ? '-circle ml-1' : ''
          }`}
          style={{ color }}
        ></i>
      )}
    </>
  )
}

export default StatusIcon
