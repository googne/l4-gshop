import React from 'react'

const MailTo = ({ email }) => {
  return <a href={`mailto:${email}`}>{email}</a>
}

export default MailTo
