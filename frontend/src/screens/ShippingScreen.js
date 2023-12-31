import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/core/FormContainer'
import FormInput from '../components/core/FormInput'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import ContinueButton from '../components/core/Button/ContinueButton'

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
    <>
      <CheckoutSteps step1 step2 />
      <FormContainer>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
          <FormInput
            name='address'
            value={address}
            onChange={setAddress}
            required
          />
          <FormInput name='city' value={city} onChange={setCity} required />
          <FormInput
            type='number'
            name='Postal Code'
            value={postalCode}
            onChange={setPostalCode}
            required
          />
          <FormInput
            name='country'
            value={country}
            onChange={setCountry}
            required
          />

          <ContinueButton />
        </Form>
      </FormContainer>
    </>
  )
}

export default ShippingScreen
