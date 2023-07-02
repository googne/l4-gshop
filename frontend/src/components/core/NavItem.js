import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const NavItem = ({ link, name, isVisible }) => {
  const nameLink = name.toLowerCase().replaceAll(' ', '')
  return (
    <Nav.Item>
      {isVisible ? (
        <LinkContainer to={`/${link || nameLink}`}>
          <Nav.Link>{name}</Nav.Link>
        </LinkContainer>
      ) : (
        <Nav.Link disabled>{name}</Nav.Link>
      )}
    </Nav.Item>
  )
}

export default NavItem
