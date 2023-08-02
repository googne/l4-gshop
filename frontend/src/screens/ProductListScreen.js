import React, { useEffect } from 'react'
import { Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/core/Message'
import Loader from '../components/core/Loader'
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import CreateButton from '../components/core/Button/CreateButton'
import IconButton from '../components/core/Button/IconButton'
import Price from '../components/core/Price/Price'
import Paginate from '../components/Paginate'
import Count from '../components/Count'

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const pageNumber = match.params.pageNumber || 1

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, count, pages, page } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>
            Products
            <Count
              type='short'
              current={products && products.length}
              total={count}
            />
          </h1>
        </Col>
        <Col className='text-right'>
          <CreateButton
            name='Product'
            onClick={createProductHandler}
            loader={loadingCreate}
          />
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {loadingDelete && <Loader />}
          {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
          {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIVITY</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>
                    <Price value={product.price} />
                  </td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <IconButton
                      type='edit'
                      link={`/admin/product/${product._id}/edit`}
                    />
                    <IconButton
                      type='delete'
                      onClick={() => deleteHandler(product._id)}
                    />
                    <IconButton
                      type='detail'
                      link={`/product/${product._id}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Count current={products.length} total={count} />
          <Paginate pages={pages} page={page} history={history} />
        </>
      )}
    </>
  )
}

export default ProductListScreen
