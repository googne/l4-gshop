import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/core/FormContainer'
import FormGroup from '../components/core/FormGroup'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address || '')
  const [city, setCity] = useState(shippingAddress.city || '')
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
  const [country, setCountry] = useState(shippingAddress.country || '')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(saveShippingAddress({ address, city, postalCode, country }))

    history.push('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup
          name='address'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <FormGroup
          name='city'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <FormGroup
          type='number'
          name='Postal Code'
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
        />
        <FormGroup
          name='country'
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />

        <Button type='submit' variant='primary'>
          Continue
          <i className='fa fa-arrow-right ml-1' />
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
