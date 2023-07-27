import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/core/Message'
import FormContainer from '../components/core/FormContainer'
import { register } from '../actions/userActions'
import Loader from '../components/core/Loader'
import FormInput from '../components/core/FormInput'
import { REGISTER_ICON } from '../constants/iconConstants'
import SubmitButton from '../components/core/Button/SubmitButton'

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  // const isRedirect = userInfo ? Object.keys(userInfo).length !== 0 : false
  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, redirect, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <FormInput name='name' value={name} onChange={setName} />
        <FormInput name='email' value={email} onChange={setEmail} />
        <FormInput
          type='password'
          name='password'
          value={password}
          onChange={setPassword}
        />
        <FormInput
          type='password'
          name='Confirm Password'
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
        <SubmitButton icon={REGISTER_ICON} label='Register' loading={loading} />
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
