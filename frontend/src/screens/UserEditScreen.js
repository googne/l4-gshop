import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/core/Message'
import FormContainer from '../components/core/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import Loader from '../components/core/Loader'
import FormInput from '../components/core/FormInput'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import BackButton from '../components/core/Button/BackButton'

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

  const goBackHandler = () => {
    history.goBack()
  }

  return (
    <>
      <BackButton onClick={goBackHandler} />
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
              <FormInput name='name' value={name} onChange={setName} />
              <FormInput name='email' value={email} onChange={setEmail} />

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
