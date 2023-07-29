import React from 'react'

const Email = ({ email }) => {
  return <a href={`Email:${email}`}>{email}</a>
}

export default Email
