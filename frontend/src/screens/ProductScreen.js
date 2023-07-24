import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails } from '../actions/productActions'
import BackButton from '../components/core/Button/BackButton'
import Loader from '../components/core/Loader'
import Message from '../components/core/Message'
import Paragraph from '../components/core/Paragraph'
import Price from '../components/core/Price/Price'
import Heading from '../components/core/Heading'

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)

  const productId = match.params.id
  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    if (productId) {
      dispatch(listProductDetails(productId))
    }
  }, [dispatch, productId])

  const addToCartHandler = () => {
    history.push(`/cart/${productId}?qty=${qty}`)
  }

  const goBackHandler = () => {
    history.goBack()
  }

  return (
    <>
      <BackButton onClick={goBackHandler} />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <Paragraph listItem='true' heading='Price'>
                <Price value={product.price} />
              </Paragraph>
              <Paragraph listItem='true'>
                <Heading value='Description' />
                {product.description}
              </Paragraph>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <Paragraph listItem='true' heading='Description'>
                  <Price value={product.price} />
                </Paragraph>

                <Paragraph listItem='true' heading='Status'>
                  {product.countInStock > 0 ? 'In' : 'Out Of'} Stock
                </Paragraph>

                {product.countInStock > 0 && (
                  <Paragraph listItem='true' heading='Qty'>
                    <Form.Control
                      as='select'
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Paragraph>
                )}
                <ListGroup.Item>
                  <Button
                    className='btn-block'
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    <i className='fa fa-cart-plus mr-1'></i>
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen
