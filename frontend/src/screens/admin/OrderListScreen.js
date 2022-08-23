import React, { useEffect } from 'react';
import dateFormat from 'dateformat';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { getAllOrders } from '../../actions/orderActions';
const OrderListScreen = () => {
  const user = useSelector((state) => state.user);
  const { authUser } = user;

  const order = useSelector((state) => state.order);
  const { orderList, loadingOrder, error } = order;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const DATE_FORMAT = 'dddd, mmm dS, yyyy';

  useEffect(() => {
    if (!(authUser && authUser.isAdmin)) {
      navigate('/login');
    } else {
      dispatch(getAllOrders());
    }
  }, [authUser]);

  return (
    <>
      {loadingOrder ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : orderList.length === 0 ? (
        <Message variant='info'>No orders in the database</Message>
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
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{dateFormat(order.createdAt, DATE_FORMAT)}</td>
                <td>${order.priceInfo.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    dateFormat(order.paidAt, DATE_FORMAT)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    dateFormat(order.deliveredAt, DATE_FORMAT)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
