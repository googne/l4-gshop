import React from 'react'
import { Row, Col, ListGroup } from 'react-bootstrap'
import Heading from './Heading'

const Paragraph = ({ listItem, heading, children }) => {
  return (
    <>
      {listItem ? (
        <ListGroup.Item>
          <Row>
            {heading && (
              <Col>
                <Heading value={heading} />
              </Col>
            )}
            <Col>{children}</Col>
          </Row>
        </ListGroup.Item>
      ) : (
        <p>
          {heading && <Heading value={heading} />}
          <span>{children}</span>
        </p>
      )}
    </>
  )
}

export default Paragraph
