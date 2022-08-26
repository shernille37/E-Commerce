import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Breadcrumbs = () => {
  return (
    <Navbar className='d-flex justify-content-center align-items-center'>
      <Nav>
        <div className='breadcrumb'>
          <LinkContainer to='userlist'>
            <Nav.Link className='breadcrumb__item'>
              <span className='breadcrumb__inner'>
                <p className='breadcrumb__title'>Users</p>
              </span>
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to='productlist'>
            <Nav.Link className='breadcrumb__item'>
              <span className='breadcrumb__inner'>
                <p className='breadcrumb__title'>Products</p>
              </span>
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to='orderlist'>
            <Nav.Link className='breadcrumb__item'>
              <span className='breadcrumb__inner'>
                <p className='breadcrumb__title'>Orders</p>
              </span>
            </Nav.Link>
          </LinkContainer>
        </div>
      </Nav>
    </Navbar>
  );
};

export default Breadcrumbs;
