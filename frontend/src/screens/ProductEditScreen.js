import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/core/Message'
import FormContainer from '../components/core/FormContainer'
import Loader from '../components/core/Loader'
import FormInput from '../components/core/FormInput'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import { listProductDetails, updateProduct } from '../actions/productActions'
import BackButton from '../components/core/Button/BackButton'
import UpdateButton from '../components/core/Button/UpdateButton'

const ProductEditScreen = ({ match, history }) => {
  const dispatch = useDispatch()
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist')
    } else {
      if (!product || !product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }
  }, [dispatch, history, product, productId, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    )
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      setUploading(false)
    }
  }

  const goBackHandler = () => {
    history.goBack()
  }

  return (
    <>
      <FormContainer md='8'>
        <BackButton onClick={goBackHandler} />
        <h1>Edit Product</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            <Form onSubmit={submitHandler}>
              <Row>
                <FormInput name='name' value={name} onChange={setName} />
              </Row>
              <Row>
                <FormInput
                  md={6}
                  type='number'
                  name='price'
                  value={price}
                  onChange={setPrice}
                />
                <FormInput
                  md={6}
                  type='number'
                  name='Count InStock'
                  value={countInStock}
                  onChange={setCountInStock}
                />
              </Row>
              <Row>
                <FormInput
                  md={6}
                  name='brand'
                  value={brand}
                  onChange={setBrand}
                />
                <FormInput
                  md={6}
                  name='category'
                  value={category}
                  onChange={setCategory}
                />
              </Row>
              <Row>
                <FormInput
                  md={6}
                  name='Image URL'
                  value={image}
                  onChange={setImage}
                />

                {/* <Col md={6}>
                  <Form.Group controlId='image'>
                    <Form.Label>
                      <strong>Image URL</strong>
                    </Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter image url'
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col> */}
                <Col md={6}>
                  <Form.Group controlId='image'>
                    <Form.Label>
                      <strong>Upload Image</strong>
                    </Form.Label>
                    <Form.File
                      id='image-file'
                      label='Choose File'
                      custom
                      onChange={uploadFileHandler}
                    ></Form.File>
                    {uploading && <Loader size='sm' />}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group controlId='description' className='pb-4'>
                    <Form.Label>
                      <strong>Description</strong>
                    </Form.Label>
                    <Form.Control
                      rows={4}
                      as='textarea'
                      name='description'
                      value={description}
                      placeholder='Enter Description'
                      onChange={(e) => setDescription(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <UpdateButton loader={loadingUpdate} />
            </Form>
          </>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
