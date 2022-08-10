import React, { useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderDetails } from '../actions/orderActions';

const OrderScreen = () => {
  const authUser = useSelector((state) => state.user.authUser);

  const order = useSelector((state) => state.order);
  const { order: orderDetails, error, loading } = order;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const orderID = params.id;

  useEffect(() => {
    if (!orderDetails) dispatch(getOrderDetails(orderID));
    if (!authUser) {
      navigate('/login');
    }
  }, [dispatch, orderID, authUser]);

  return (
    <>
      {loading ? (
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
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <h5>Method: </h5>
                  <p>{orderDetails.paymentInfo.paymentMethod}</p>
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
