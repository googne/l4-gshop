import React from 'react'

const StatusIcon = ({ condition, children }) => {
  const color = condition ? 'green' : 'red'
  return (
    <>
      {children && condition ? (
        children
      ) : (
        <i
          className={`fas fa-${condition ? 'check' : 'times'}`}
          style={{ color }}
        ></i>
      )}
    </>
  )
}

export default StatusIcon
