import React, { Children, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { listProducts } from '../../actions/productActions';

import {
  resetDeleteSuccess,
  resetUpdateSuccess,
} from '../../reducers/userReducers';

const ProductListScreen = () => {
  const user = useSelector((state) => state.user);
  const { authUser } = user;

  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!(authUser && authUser.isAdmin)) {
      navigate('/login');
    } else if (products.length === 0) {
      dispatch(listProducts());
    }
  }, [dispatch, authUser]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      console.log('Delete Product');
    }
  };

  const createProductHandler = () => {
    console.log('Create Product');
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : products.length === 0 ? (
        <Message variant='info'>No products in the database</Message>
      ) : (
        <>
          {}
          {/* {loadingDelete && <Message variant='info'>Deleting...</Message>}
          {successUpdate && (
            <Message variant='success'>Profile Updated</Message>
          )}
          {successDelete && <Message variant='success'>User Deleted</Message>} */}

          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>

                  <td>&euro;{product.price}</td>

                  <td>{product.category}</td>

                  <td>{product.brand}</td>

                  <td>
                    <LinkContainer to={`${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>

                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
