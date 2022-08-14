import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import dateFormat from 'dateformat';
import { getProfile, updateProfile } from '../actions/userActions';
import { resetUpdateSuccess } from '../reducers/userReducers';
import { getMyOrders } from '../actions/orderActions';

const ProfileScreen = () => {
  const user = useSelector((state) => state.user);
  const { authUser, userDetails, error, successUpdate } = user;

  const order = useSelector((state) => state.order);
  const { myOrders, loading, error: orderError } = order;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate('/login?redirect=/profile');
    } else if (!userDetails || authUser._id !== userDetails._id) {
      dispatch(getProfile());
    } else {
      dispatch(getMyOrders());
      setName(userDetails.name);
      setEmail(userDetails.email);
    }

    if (successUpdate) {
      setTimeout(() => dispatch(resetUpdateSuccess()), 3000);
    }
  }, [navigate, dispatch, authUser, userDetails]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateProfile({ name, email, password }));
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {successUpdate && <Message variant='success'>Profile Updated</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Button className='mt-2' type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loading ? (
          <Loader />
        ) : orderError ? (
          <Message variant={'danger'}>{orderError}</Message>
        ) : myOrders.length === 0 ? (
          <Message variant='info'>You don't have any orders</Message>
        ) : (
          <Table
            striped
            bordered
            hover
            responsive
            className='table-sm text-center'
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE OF ORDER</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{dateFormat(order.createdAt, 'mmm d, yyyy')}</td>
                  <td>&euro;{order.priceInfo.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      dateFormat(order.paidAt, 'mmm d, yyyy')
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      dateFormat(order.deliveredAt, 'mmm d, yyyy')
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
