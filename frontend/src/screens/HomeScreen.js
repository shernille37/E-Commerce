import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Product from '../components/Product';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { getProfile } from '../actions/userActions';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const user = useSelector((state) => state.user);
  const { userDetails, authUser } = user;
  const { loading, error, products } = productList;

  useEffect(() => {
    if (authUser && !userDetails) {
      dispatch(getProfile());
    }
    dispatch(listProducts());
  }, [dispatch, userDetails]);
  return (
    <>
      <h1>Latest Products</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
