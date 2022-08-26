import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import Message from './Message';
import { getTopProducts } from '../actions/productActions';

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.productList);
  const { topProducts, loadingTopProducts, errorTopProducts } = products;

  useEffect(() => {
    dispatch(getTopProducts());
  }, [dispatch]);

  return loadingTopProducts ? (
    <Loader />
  ) : errorTopProducts ? (
    <Message variant='danger'>{errorTopProducts}</Message>
  ) : (
    <Carousel
      pause='hover'
      nextLabel=''
      prevLabel=''
      className='bg-dark mb-3 rounded'
    >
      {topProducts.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {product.name} (&euro;{product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
