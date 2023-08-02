import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/core/Message'
import PriceList from '../components/core/Price/PriceList'
import {
  deliverOrder,
  getOrderDetails,
  payOrder,
} from '../actions/orderActions'
import Loader from '../components/core/Loader'
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../constants/orderConstants'
import Email from '../components/core/Email'
import NA from '../components/core/NA'
import Paragraph from '../components/core/Paragraph'
import PriceDescription from '../components/core/Price/PriceDescription'
import { DELIVERED_ICON } from '../constants/iconConstants'
import BlockButton from '../components/core/Button/BlockButton'
import GDate from '../components/core/GDate'

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id
  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay, error: errorPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const {
    loading: loadingDeliver,
    success: successDeliver,
    error: errorDeliver,
  } = orderDeliver

  //calculate Price
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  if (!loading && order) {
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true

      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, history, userInfo, order, successPay, orderId, successDeliver])

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(orderId))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : errorPay ? (
    <Message variant='danger'>{errorPay}</Message>
  ) : errorDeliver ? (
    <Message variant='danger'>{errorDeliver}</Message>
  ) : (
    <>
      <h1>Order: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <Paragraph heading='Name'>
                {order.user ? order.user.name : <NA />}
              </Paragraph>
              <Paragraph heading='Email'>
                {order.user ? <Email email={order.user.email} /> : <NA />}
              </Paragraph>
              <Paragraph heading='Address'>
                {order.shippingAddress.address}, {order.shippingAddress.city}
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </Paragraph>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on{' '}
                  <GDate value={order.deliveredAt} type='datetime' />
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <Paragraph heading='Payment Method'>
                {order.paymentMethod}
              </Paragraph>
              {order.isPaid ? (
                <Message variant='success'>
                  Paid on <GDate value={order.paidAt} type='datetime' />
                </Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          <PriceDescription qty={item.qty} price={item.price} />
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2> Order Summary</h2>
              </ListGroup.Item>

              <PriceList data={order} />

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <BlockButton
                    onClick={deliverHandler}
                    icon={DELIVERED_ICON}
                    label='Mark As Delivered'
                    loader={loadingDeliver}
                  />
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
