import React, { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../reducers/cartReducers';
import LoginScreen from '../screens/LoginScreen';

const PaymentScreen = () => {
  const authUser = useSelector((state) => state.user.authUser);
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod, cartItems } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [payment, setPayment] = useState('Paypal');

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [shippingAddress, paymentMethod]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(payment));
    navigate('/placeorder');
  };

  return (
    <>
      {!authUser ? (
        <>
          <CheckoutSteps step1 /> <LoginScreen />
        </>
      ) : cartItems.length === 0 ? (
        <Message>
          Your cart is empty{' '}
          <Link to='/'>
            {' '}
            <span style={{ textDecoration: 'underline' }}>Go Back</span>
          </Link>
        </Message>
      ) : (
        <>
          <FormContainer>
            <CheckoutSteps step2 step3 step4={paymentMethod ? true : false} />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
              <Form.Group>
                <Form.Label as='legend'>Select Payment Method</Form.Label>
                <Col>
                  <Form.Check
                    type='radio'
                    label='PayPal or Credit Card'
                    id='PayPal'
                    name='paymentMethod'
                    value='PayPal'
                    checked
                    onChange={(e) => setPayment(e.target.value)}
                  ></Form.Check>
                </Col>
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

export default PaymentScreen;
