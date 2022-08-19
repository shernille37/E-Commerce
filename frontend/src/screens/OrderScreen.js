import React, { useState, useEffect } from 'react';
import PayPalButton from '../components/PayPalButton';
import dateFormat from 'dateformat';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderDetails, payOrder } from '../actions/orderActions';

const OrderScreen = () => {
  const authUser = useSelector((state) => state.user.authUser);

  const order = useSelector((state) => state.order);
  const { order: orderDetails, error, loading, successPayment } = order;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const orderID = params.id;

  const DATE_FORMAT = 'dddd, mmm dS, yyyy';

  useEffect(() => {
    if (!authUser) {
      navigate('/login');
    } else if (!orderDetails || orderDetails._id !== orderID || successPayment)
      dispatch(getOrderDetails(orderID));
  }, [dispatch, orderID, authUser, successPayment]);

  return (
    <>
      {loading || !orderDetails ? (
        <Loader />
      ) : error ? (
        <Message variant={'danger'}>{error}</Message>
      ) : (
        <>
          <h1>Order {orderDetails._id}</h1>
          <p>
            {' '}
            <strong>Name: </strong> {orderDetails.user.name}
          </p>
          <p>
            <strong>Email: </strong>
            <a href={`mailto:${orderDetails.user.email}`}>
              {orderDetails.user.email}
            </a>
          </p>
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Shipping</h2>

                  <h5>Address:</h5>
                  <p>{orderDetails.shippingAddress.address}</p>
                  <p>{orderDetails.shippingAddress.city}</p>
                  <p>{orderDetails.shippingAddress.postalCode}</p>
                  <p>{orderDetails.shippingAddress.country}</p>

                  {orderDetails.isDelivered ? (
                    <Message variant={'success'}>
                      Delivered on{' '}
                      {dateFormat(orderDetails.deliveredAt, DATE_FORMAT)}
                    </Message>
                  ) : (
                    <Message variant={'danger'}>Not Delivered</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <div>
                    <h5>Method: </h5>
                    <p>{orderDetails.paymentInfo.paymentMethod}</p>
                  </div>
                  {orderDetails.isPaid ? (
                    <Message variant={'success'}>
                      Paid on {dateFormat(orderDetails.paidAt, DATE_FORMAT)}
                    </Message>
                  ) : (
                    <Message variant={'danger'}>Not Paid</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {orderDetails.orderItems.length === 0 ? (
                    <Message>Your order is empty</Message>
                  ) : (
                    <ListGroup variant='flush'>
                      {orderDetails.orderItems.map((item) => (
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
                      <Col>&euro;{orderDetails.priceInfo.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>&euro;{orderDetails.priceInfo.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>&euro;{orderDetails.priceInfo.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>&euro;{orderDetails.priceInfo.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  {!orderDetails.isPaid && (
                    <ListGroup.Item>
                      {loading && <Loader />}

                      <PayPalButton
                        currency={'EUR'}
                        amount={orderDetails.priceInfo.totalPrice}
                      />
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default OrderScreen;
