import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import StatusIcon from './core/StatusIcon'

const NavItem = ({ link, name, isVisible }) => {
  const nameLink = name.toLowerCase().replaceAll(' ', '')
  return (
    <Nav.Item>
      {isVisible ? (
        <LinkContainer to={`/${link || nameLink}`}>
          <Nav.Link>
            {name}
            <StatusIcon condition={true} circle={true} />
            {/* <i className='fa fa-arrow-right ml-3 pl-3'></i> */}
          </Nav.Link>
        </LinkContainer>
      ) : (
        <Nav.Link disabled>
          {name}
          <StatusIcon condition={false} circle={true} />
        </Nav.Link>
      )}
    </Nav.Item>
  )
}

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <NavItem link='login' name='Sign In' isVisible={step1} />
      <NavItem name='Shipping' isVisible={step2} />
      <NavItem name='Payment' isVisible={step3} />
      <NavItem name='Place Order' isVisible={step4} />
    </Nav>
  )
}

export default CheckoutSteps
