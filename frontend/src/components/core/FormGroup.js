import React from 'react'
import { Form } from 'react-bootstrap'

const FormGroup = (props) => {
  const { name } = props
  const capitalName =
    name.slice(0, 1).toUpperCase() + name.slice(1, name.length)
  let camelName = name.replaceAll(' ', '')
  camelName =
    camelName.slice(0, 1).toLowerCase() + camelName.slice(1, camelName.length)

  return (
    <Form.Group controlId={camelName} className='pb-4'>
      <Form.Label>{capitalName}</Form.Label>
      <Form.Control
        type='text'
        {...props}
        name={camelName}
        placeholder={`Enter ${capitalName}`}
      ></Form.Control>
    </Form.Group>
  )
}

export default FormGroup
