import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/core/Message'
import { deleteUser, listUsers } from '../actions/userActions'
import Loader from '../components/core/Loader'
import Email from '../components/core/Email'
import StatusIcon from '../components/core/StatusIcon'
import IconButton from '../components/core/Button/IconButton'
import Count from '../components/Count'
import Paginate from '../components/Paginate'

const UserListScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const pageNumber = match.params.pageNumber || 1

  const userList = useSelector((state) => state.userList)
  const { loading, error, users, count, pages, page } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers(pageNumber))
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, successDelete, pageNumber])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <>
      <h1>
        Users
        <Count type='short' current={users && users.length} total={count} />
      </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th>ACTIVITY</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <Email email={user.email} />
                  </td>
                  <td>
                    <StatusIcon condition={user.isAdmin} />
                  </td>
                  <td>
                    {userInfo._id === user._id ? (
                      <h4 className='text-success'>LOGGEDIN USER</h4>
                    ) : (
                      <>
                        <IconButton
                          type='edit'
                          link={`/admin/user/${user._id}/edit`}
                        />
                        <IconButton
                          type='delete'
                          onClick={() => deleteHandler(user._id)}
                        />
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Count current={users.length} total={count} />
          <Paginate pages={pages} page={page} history={history} />
        </>
      )}
    </>
  )
}

export default UserListScreen
