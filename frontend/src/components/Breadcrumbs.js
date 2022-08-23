import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Breadcrumbs = () => {
  return (
    <Navbar className='d-flex justify-content-center align-items-center'>
      <Nav>
        <div className='breadcrumb'>
          <div className='breadcrumb__item'>
            <span className='breadcrumb__inner'>
              <LinkContainer to='userlist'>
                <Nav.Link className='breadcrumb__title'>Users</Nav.Link>
              </LinkContainer>
            </span>
          </div>
          <div className='breadcrumb__item'>
            <span className='breadcrumb__inner'>
              <LinkContainer to='productlist'>
                <Nav.Link className='breadcrumb__title'>Products</Nav.Link>
              </LinkContainer>
            </span>
          </div>
          <div className='breadcrumb__item'>
            <span className='breadcrumb__inner'>
              <LinkContainer to='orderlist'>
                <Nav.Link className='breadcrumb__title'>Orders</Nav.Link>
              </LinkContainer>
            </span>
          </div>
        </div>
      </Nav>
    </Navbar>
  );
};

export default Breadcrumbs;
