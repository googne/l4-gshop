import React from 'react'
import { Row, Col } from 'react-bootstrap'

const Count = ({ type, current, total }) => {
  return (
    <>
      {current && total ? (
        <>
          {type === 'short' ? (
            <span className='ml-1'>
              ({current}/{total})
            </span>
          ) : (
            <Row className='align-items-center ml-2'>
              <Col>
                <p>
                  <strong className='text-danger'>
                    Showing Records: {current} out of {total}
                  </strong>
                </p>
              </Col>
            </Row>
          )}
        </>
      ) : (
        ''
      )}
    </>
  )
}

export default Count
