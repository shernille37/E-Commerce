import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../../actions/productActions';

import {
  resetDeleteSuccess,
  resetUpdateSuccess,
  resetCreateSuccess,
} from '../../reducers/productReducers';
import Paginate from '../../components/utils/Paginate';

const ProductListScreen = () => {
  const user = useSelector((state) => state.user);
  const { authUser } = user;

  const productList = useSelector((state) => state.productList);
  const {
    products,
    pages,
    page,
    loading,
    error,
    loadingDelete,
    successDelete,
  } = productList;

  const productDetails = useSelector((state) => state.productDetails);
  const { product, successCreate, successUpdate, loadingUpdate } =
    productDetails;

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const params = useParams();

  const pageNumber = params.pageNumber;

  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  const handleClose = () => setShow(false);

  useEffect(() => {
    if (!(authUser && authUser.isAdmin)) {
      navigate('/login');
    } else {
      dispatch(listProducts({ keyword: '', pageNumber }));
    }
  }, [dispatch, authUser, pageNumber]);

  useEffect(() => {
    if (successCreate) {
      dispatch(resetCreateSuccess());
      navigate(`${product._id}/edit`);
      dispatch(listProducts({ keyword: '', pageNumber }));
    } else if (successDelete || successUpdate) {
      dispatch(listProducts({ keyword: '', pageNumber }));
    }

    if (successDelete || successUpdate) {
      const timeout = setTimeout(() => {
        dispatch(resetDeleteSuccess());
        dispatch(resetUpdateSuccess());
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [dispatch, successDelete, successCreate, successUpdate]);

  const deleteHandler = () => {
    dispatch(deleteProduct(deleteId));
    setShow(false);
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className='align-items-center'>
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
          {loadingUpdate && <Message variant='info'>Updating</Message>}
          {loadingDelete && <Message variant='info'>Deleting...</Message>}
          {successUpdate && (
            <Message variant='success'>Product Updated</Message>
          )}
          {successDelete && (
            <Message variant='success'>Product Deleted</Message>
          )}

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
                      onClick={() => {
                        setDeleteId(product._id);
                        setShow(true);
                      }}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header>Delete Product</Modal.Header>
            <Modal.Body>
              {' '}
              <strong>Are you sure?</strong>{' '}
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleClose}>
                Close
              </Button>
              <Button variant='danger' onClick={deleteHandler}>
                Delete Product
              </Button>
            </Modal.Footer>
          </Modal>

          <Paginate
            pages={pages}
            page={page}
            keyword={''}
            isAdmin={authUser && authUser.isAdmin}
          />
        </>
      )}

      {!pageNumber && <Outlet />}
    </>
  );
};

export default ProductListScreen;
