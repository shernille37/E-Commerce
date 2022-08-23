import React, { useEffect } from 'react';
import SearchBox from './SearchBox';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/userActions';
import { getProfile } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { authUser } = user;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>Shop</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />

        <Navbar.Collapse id='basic-navbar-nav'>
          <SearchBox />
          <Nav className='ml-auto'>
            <LinkContainer to='/cart'>
              <Nav.Link>
                {' '}
                <i className='fas fa-shopping-cart'></i> Cart
              </Nav.Link>
            </LinkContainer>

            {authUser ? (
              <NavDropdown title={authUser.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to='/login'>
                <Nav.Link>
                  {' '}
                  <i className='fas fa-user'></i> Sign In
                </Nav.Link>
              </LinkContainer>
            )}
            {authUser && authUser.isAdmin && (
              <LinkContainer to='/admin'>
                <Nav.Link>
                  {' '}
                  <i className='fas fa-user mr-2'></i>Admin
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
