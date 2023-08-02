import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const SearchBox = ({ pages, page, history }) => {
  let location = history && history.location.pathname.split('/page')[0]
  if (location === '/') {
    location = ''
  }

  return (
    pages > 1 && (
      <Pagination className='justify-content-center mt-2'>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer key={x + 1} to={`${location}/page/${x + 1}`}>
            <Pagination.Item active={x + 1 === page} className='mr-1'>
              {x + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  )
}

export default SearchBox
