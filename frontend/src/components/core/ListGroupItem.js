import React from 'react'
import { Row, Col, ListGroup } from 'react-bootstrap'

const ListGroupItem = ({ label, children }) => {
  return (
    <>
      <ListGroup.Item>
        <Row>
          <Col>{label}:</Col>
          <Col>{children}</Col>
        </Row>
      </ListGroup.Item>
    </>
  )
}

export default ListGroupItem
