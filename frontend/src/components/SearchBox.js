import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { SEARCH_ICON } from '../constants/iconConstants'
import SubmitButton from './core/Button/SubmitButton'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
      setKeyword('')
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Seach Products...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <SubmitButton
        icon={SEARCH_ICON}
        variant='outline-success'
        className='p-2'
        label='Search'
      />
    </Form>
  )
}

export default SearchBox
