import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/core/Message'
import FormContainer from '../components/core/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import Loader from '../components/core/Loader'
import FormGroup from '../components/core/FormGroup'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = ({ match, history }) => {
  const dispatch = useDispatch()
  const userId = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/userlist')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, history, user, userId, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateUser({
        _id: userId,
        name,
        email,
        isAdmin,
      })
    )
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/admin/userlist'>
        <i className='fa fa-arrow-left mr-1' />
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            <Form onSubmit={submitHandler}>
              <FormGroup name='name' value={name} onChange={setName} />
              <FormGroup name='email' value={email} onChange={setEmail} />

              <Form.Group controlId='isadmin'>
                <Form.Check
                  type='checkbox'
                  label='Is Admin'
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                ></Form.Check>
              </Form.Group>

              <Button type='submit' variant='primary'>
                {loadingUpdate && <Loader size='sm' />}
                Update
              </Button>
            </Form>
          </>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen