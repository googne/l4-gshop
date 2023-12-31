import React, { useState } from 'react'
import { Form, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/core/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/core/Message'
import ContinueButton from '../components/core/Button/ContinueButton'

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  const error = ''

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <FormContainer>
        <h1>Payment Method</h1>
        {error && <Message variant='danger'>{error}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group className='pb-4'>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Col>
              <Form.Check
                type='radio'
                label='PayPal or Credit Card'
                id='PayPal'
                name='paymentMethod'
                value='PayPal'
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              {/* <Form.Check
                type='radio'
                label='Stripe'
                id='Stripe'
                name='paymentMethod'
                value='Stripe'
                onChange={(e) => setPaymentMethod(e.target.value)}
              /> */}
            </Col>
          </Form.Group>

          <ContinueButton />
        </Form>
      </FormContainer>
    </>
  )
}

export default PaymentScreen
