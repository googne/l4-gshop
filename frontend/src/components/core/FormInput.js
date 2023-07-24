import React from 'react'
import { Form, Col } from 'react-bootstrap'

const FormInput = (props) => {
  const { name, md } = props
  const capitalName =
    name.slice(0, 1).toUpperCase() + name.slice(1, name.length)
  let camelName = name.replaceAll(' ', '')
  camelName =
    camelName.slice(0, 1).toLowerCase() + camelName.slice(1, camelName.length)

  return (
    <>
      <Col md={md}>
        <Form.Group controlId={camelName} className='pb-4'>
          <Form.Label>
            <strong>{capitalName}</strong>
          </Form.Label>
          <Form.Control
            type='text'
            {...props}
            name={camelName}
            placeholder={`Enter ${capitalName}`}
            onChange={(e) => props.onChange(e.target.value)}
          ></Form.Control>
        </Form.Group>
      </Col>
    </>
  )
}

FormInput.defaultProps = {
  md: 12,
}

export default FormInput
