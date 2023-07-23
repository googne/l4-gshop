import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'

import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { getLoginUserOrderList } from '../actions/orderActions'
import Loader from '../components/core/Loader'
import Message from '../components/core/Message'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import StatusIcon from '../components/core/StatusIcon'
import FormGroup from '../components/core/FormGroup'

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { loading: loadingUserUpdate, success } = userUpdateProfile

  const loginUserOrderList = useSelector((state) => state.loginUserOrderList)
  const {
    loading: loadingOrders,
    error: errorOrders,
    orders,
  } = loginUserOrderList

  const isOrderListAvail = orders && orders.length === 0

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
        if (!success) {
          dispatch(getLoginUserOrderList())
        }
        setMessage(null)
        setPassword('')
        setConfirmPassword('')
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user, success])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password,
        })
      )
    }
  }

  return (
    <>
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <>
              {message && <Message variant='warning'>{message}</Message>}
              {success && <Message variant='success'>Profile Updated</Message>}
              <Form onSubmit={submitHandler}>
                <FormGroup name='name' value={name} onChange={setName} />
                <FormGroup name='email' value={email} onChange={setEmail} />
                <FormGroup
                  type='password'
                  name='password'
                  value={password}
                  onChange={setPassword}
                />
                <FormGroup
                  type='password'
                  name='Confirm Password'
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                />
                <Button type='submit' variant='primary'>
                  {loadingUserUpdate && <Loader size='sm' />}
                  Update
                </Button>
              </Form>
            </>
          )}
        </Col>
        <Col md={9}>
          <h2>My Order</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant='danger'>{errorOrders}</Message>
          ) : isOrderListAvail ? (
            <Message variant='info'>No Order Available</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <StatusIcon condition={false} />
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <StatusIcon condition={false} />
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className='btn-sm' variant='light'>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  )
}

export default ProfileScreen
