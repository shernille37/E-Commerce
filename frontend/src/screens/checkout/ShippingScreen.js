import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import { Link } from 'react-router-dom';
import FormContainer from '../../components/FormContainer';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../../reducers/cartReducers';

const ShippingScreen = () => {
  const authUser = useSelector((state) => state.user.authUser);
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod, cartItems } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    if (!authUser) navigate('/checkout/signin');
    if (shippingAddress) {
      setAddress(shippingAddress.address);
      setCity(shippingAddress.city);
      setPostalCode(shippingAddress.postalCode);
      setCountry(shippingAddress.country);
    }
  }, [shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate('/checkout/payment');
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <Message>
          Your cart is empty{' '}
          <Link to='/'>
            {' '}
            <span style={{ textDecoration: 'underline' }}>Go Back</span>
          </Link>
        </Message>
      ) : (
        <>
          <h1 className='text-center'>Shipping</h1>
          <FormContainer>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Address'
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter City'
                  value={city}
                  required
                  onChange={(e) => setCity(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='postalCode'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Postal Code'
                  value={postalCode}
                  required
                  onChange={(e) => setPostalCode(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Country'
                  value={country}
                  required
                  onChange={(e) => setCountry(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button className='mt-3' type='submit' variant='primary'>
                Continue
              </Button>
            </Form>
          </FormContainer>
        </>
      )}
    </>
  );
};

export default ShippingScreen;
