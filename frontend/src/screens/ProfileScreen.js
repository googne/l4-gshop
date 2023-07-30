import React, { useState, useEffect } from 'react'

import { Form, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { getLoginUserOrderList } from '../actions/orderActions'
import Loader from '../components/core/Loader'
import Message from '../components/core/Message'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import StatusIcon from '../components/core/StatusIcon'
import FormInput from '../components/core/FormInput'
import Price from '../components/core/Price/Price'
import Date from '../components/core/Date'
import UpdateButton from '../components/core/Button/UpdateButton'
import IconButton from '../components/core/Button/IconButton'

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
    if (success) {
      setMessage(null)
      setPassword('')
      setConfirmPassword('')
    }

    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
        if (!success) {
          dispatch(getLoginUserOrderList())
        }
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
                <UpdateButton loader={loadingUserUpdate} />
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
                    <td>
                      <Date value={order.createdAt} />
                    </td>
                    <td>
                      <Price value={order.totalPrice} />
                    </td>
                    <td>
                      <StatusIcon condition={order.isPaid}>
                        {(order.isPaid && order.paidAt.substring(0, 10)) || ''}
                      </StatusIcon>
                    </td>
                    <td>
                      <StatusIcon condition={order.isDelivered}>
                        {order.isDelivered &&
                          order.deliveredAt.substring(0, 10)}
                      </StatusIcon>
                    </td>
                    <td>
                      <IconButton type='detail' link={`/order/${order._id}`} />
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
