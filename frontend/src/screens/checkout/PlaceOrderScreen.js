import React, { useState, useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { calculatePrices } from '../../reducers/cartReducers';
import { createOrder } from '../../actions/orderActions';
import { resetSuccessOrder } from '../../reducers/orderReducers';
import { resetCartItems } from '../../reducers/cartReducers';

const PlaceOrderScreen = () => {
  const authUser = useSelector((state) => state.user.authUser);
  const cart = useSelector((state) => state.cart);
  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = cart;

  const order = useSelector((state) => state.order);
  const { order: createdOrder, successOrder, loading, error } = order;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) navigate('/checkout');
    else if (!paymentMethod || !shippingAddress) navigate('/checkout/payment');
    dispatch(calculatePrices());
  }, [shippingAddress, paymentMethod]);

  useEffect(() => {
    if (successOrder) {
      navigate(`/order/${createdOrder._id}`);
      dispatch(resetSuccessOrder());
      dispatch(resetCartItems());
    }
  }, [dispatch, successOrder]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
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
      ) : loading || !shippingAddress || !paymentMethod ? (
        <Loader />
      ) : (
        <>
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Shipping</h2>

                  <h5>Address:</h5>
                  <p>{shippingAddress.address}</p>
                  <p>{shippingAddress.city}</p>
                  <p>{shippingAddress.postalCode}</p>
                  <p>{shippingAddress.country}</p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <h5>Method: </h5>
                  <p>{paymentMethod}</p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {cartItems.length === 0 ? (
                    <Message>Your cart is empty</Message>
                  ) : (
                    <ListGroup variant='flush'>
                      {cartItems.map((item, index) => (
                        <ListGroup.Item key={item.product}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>

                            <Col>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>

                            <Col md={4}>
                              {item.qty} x &euro;{item.price} = &euro;
                              {Number(item.qty * item.price).toFixed(2)}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>&euro;{itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>&euro;{shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>&euro;{taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>&euro;{totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  {error && (
                    <ListGroup.Item>
                      <Message variant={'danger'}>{error}</Message>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn-block'
                      disabled={cartItems.length === 0}
                      onClick={placeOrderHandler}
                    >
                      Place Order
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default PlaceOrderScreen;
