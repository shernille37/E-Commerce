import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Product from '../components/Product';
import { Link, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Paginate from '../components/utils/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import SortBox from '../components/utils/SortBox';
import Category from '../components/Category';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  const [params, setParams] = useSearchParams();
  const search = params.get('search') || '';
  const pageNumber = params.get('page') || 1;
  const sort = params.get('sort') || '';

  useEffect(() => {
    dispatch(listProducts({ search, pageNumber, sort }));
  }, [dispatch, params]);

  return (
    <>
      {!search ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light mb-3'>
          Go Back
        </Link>
      )}
      <Category />
      <Row>
        <Col>
          <h1>Latest Products</h1>
        </Col>
        <Col className='text-right'>
          <SortBox />
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={search} sort={sort} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
