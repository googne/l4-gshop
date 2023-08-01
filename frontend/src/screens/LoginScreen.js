import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/core/FormContainer'
import { login } from '../actions/userActions'
import Message from '../components/core/Message'
import FormInput from '../components/core/FormInput'
import SubmitButton from '../components/core/Button/SubmitButton'
import { SIGN_IN_ICON } from '../constants/iconConstants'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      <Form onSubmit={submitHandler}>
        <FormInput name='email' value={email} onChange={setEmail} />
        <FormInput
          type='password'
          name='password'
          value={password}
          onChange={setPassword}
        />
        <SubmitButton icon={SIGN_IN_ICON} label='Sign In' loader={loading} />
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            <strong>Register</strong>
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
