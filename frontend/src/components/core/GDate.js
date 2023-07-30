import React from 'react'

const GDate = ({ value }) => {
  const formatDate = (date) => {
    const formattedDate = Intl.DateTimeFormat('en', {
      year: 'numeric',
      day: '2-digit',
      month: 'long',
    }).format(new Date(date))
    return formattedDate
  }

  return (
    <>
      <span>{formatDate(value)}</span>
    </>
  )
}

export default GDate
