import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/core/Message'
import Loader from '../components/core/Loader'
import IconButton from '../components/core/Button/IconButton'
import { listOrders } from '../actions/orderActions'
import StatusIcon from '../components/core/StatusIcon'
import NA from '../components/core/NA'
import Price from '../components/core/Price/Price'
import GDate from '../components/core/GDate'
import Paginate from '../components/Paginate'
import Count from '../components/Count'

const OrderListScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const pageNumber = match.params.pageNumber || 1

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders, count, pages, page } = orderList

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders(pageNumber))
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, pageNumber])

  return (
    <>
      <h1>
        ORDERS{' '}
        <Count type='short' current={orders && orders.length} total={count} />
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
                <th>USER</th>
                <th>ORDER DATE</th>
                <th>TOTAL PRICE</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIVITY</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{(order.user && order.user.name) || <NA />}</td>
                  <td>
                    <GDate value={order.createdAt} />
                  </td>
                  <td>
                    <Price value={order.totalPrice} />
                  </td>
                  <td>
                    <StatusIcon condition={order.isPaid}>
                      {order.isPaid && <GDate value={order.paidAt} />}
                    </StatusIcon>
                  </td>
                  <td>
                    <StatusIcon condition={order.isDelivered}>
                      {order.isDelivered && <GDate value={order.deliveredAt} />}
                    </StatusIcon>
                  </td>
                  <td>
                    <IconButton type='detail' link={`/order/${order._id}`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Count current={orders.length} total={count} />
          <Paginate pages={pages} page={page} history={history} />
        </>
      )}
    </>
  )
}

export default OrderListScreen
