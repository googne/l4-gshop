  import React from 'react'

  const GDate = ({ value, type }) => {
    const options =
      type === 'datetimezone'
        ? {
            year: 'numeric',
            day: '2-digit',
            month: 'short',
            weekday: 'short',
            hour: 'numeric',
            minute: 'numeric',
            timeZoneName: 'short',
            timeZone: 'Asia/Kolkata',
          }
        : type === 'datetime'
        ? {
            year: 'numeric',
            day: '2-digit',
            month: 'short',
            weekday: 'short',
            hour: 'numeric',
            minute: 'numeric',
          }
        : type === 'date'
        ? { year: 'numeric', day: '2-digit', month: 'short' }
        : {}

    const formatDate = (date) => {
      const formattedDate = Intl.DateTimeFormat('en', options).format(
        new Date(date)
      )
      return formattedDate
    }

    return (
      <>
        <span>{formatDate(value)}</span>
      </>
    )
  }

  GDate.defaultProps = {
    type: 'date',
  }

  export default GDate
