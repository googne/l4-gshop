import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import {
  createProductReview,
  listProductDetails,
} from '../actions/productActions'
import BackButton from '../components/core/Button/BackButton'
import Loader from '../components/core/Loader'
import Message from '../components/core/Message'
import Paragraph from '../components/core/Paragraph'
import Price from '../components/core/Price/Price'
import Date from '../components/core/Date'
import Heading from '../components/core/Heading'
import BlockButton from '../components/core/Button/BlockButton'
import { CART_ICON, SUBMIT_ICON } from '../constants/iconConstants'
import SubmitButton from '../components/core/Button/SubmitButton'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import Meta from '../components/Meta'

const ProductScreen = ({ history, match }) => {
  const productId = match.params.id
  const dispatch = useDispatch()

  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [animation, setAnimation] = useState(false)

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      setRating(0)
      setComment('')

      setTimeout(() => setAnimation(true), 500)
      setTimeout(() => setAnimation(false), 3000)
    }
    dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    dispatch(listProductDetails(productId))
    // if (successProductReview || errorProductReview) {
    //   setRating(0)
    //   setComment('')
    // }

    // if (successProductReview) {
    //   setTimeout(() => setAnimation(true), 500)
    //   setTimeout(() => setAnimation(false), 3000)
    // }

    // if (
    //   !product ||
    //   !product._id ||
    //   product._id !== productId ||
    //   successProductReview
    // ) {
    //   dispatch(listProductDetails(productId))
    //   dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    // }
  }, [dispatch, productId, successProductReview])

  const addToCartHandler = () => {
    history.push(`/cart/${productId}?qty=${qty}`)
  }

  const goBackHandler = () => {
    history.goBack()
  }

  const reviewSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(productId, {
        rating,
        comment,
      })
    )
  }

  return (
    <>
      <BackButton onClick={goBackHandler} />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
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
                  <BlockButton
                    disabled={product.countInStock}
                    onClick={addToCartHandler}
                    icon={CART_ICON}
                    label='Add to Cart'
                  />
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>REVIEWS</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review, i) => (
                  <ListGroup.Item
                    key={review._id}
                    className={
                      i === product.reviews.length - 1 && animation
                        ? 'highlight-review'
                        : ''
                    }
                  >
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>
                      <Date value={review.createdAt} />
                    </p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col md={6}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {/* {successProductReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )} */}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}

                  {userInfo ? (
                    <Form onSubmit={reviewSubmitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <SubmitButton
                        icon={SUBMIT_ICON}
                        label='Submit'
                        loader={loadingProductReview}
                      />
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>SignIn</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
