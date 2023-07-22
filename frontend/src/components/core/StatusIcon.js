import React from 'react'

const StatusIcon = ({ condition }) => {
  const color = condition ? 'green' : 'red'
  return (
    <>
      <i
        className={`fas fa-${condition ? 'check' : 'times'}`}
        style={{ color }}
      ></i>
    </>
  )
}

export default StatusIcon
