import React, { useState, useEffect } from 'react';
import { listProductDetails } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { addToCart } from '../actions/cartActions';
import { createProductReview } from '../actions/productActions';
import { Row, Col, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ZoomImage from '../components/ZoomImage';
import {
  resetErrorReview,
  resetReviewSuccess,
} from '../reducers/productReducers';

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const params = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.user.authUser);
  const productDetails = useSelector((state) => state.productDetails);

  const { loading, error, product, loadingReview, successReview, errorReview } =
    productDetails;

  useEffect(() => {
    dispatch(listProductDetails(params.id));
  }, [dispatch]);

  useEffect(() => {
    if (successReview) {
      dispatch(listProductDetails(params.id));
      setRating(0);
      setComment('');
      setTimeout(() => dispatch(resetReviewSuccess()), 3000);
    }
    if (errorReview) {
      setTimeout(() => dispatch(resetErrorReview()), 3000);
    }
  }, [dispatch, successReview, errorReview]);

  const addToCartHandler = () => {
    dispatch(addToCart({ id: product._id, qty }));
    navigate(`/cart`);
  };

  const createReviewHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview({ id: params.id, rating, comment }));
  };

  return (
    <>
      <Button
        className='btn btn-light my-3'
        type='button'
        onClick={() => navigate(-1)}
      >
        Go Back
      </Button>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <ZoomImage img={product.image} alt={product.name} />
            </Col>

            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>

                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (qty) => (
                                <option key={qty + 1} value={qty + 1}>
                                  {qty + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {loadingReview && (
                <Message variant='info'>Submitting review...</Message>
              )}
              {successReview && (
                <Message variant='success'>Review Submitted</Message>
              )}
              {product.reviews.length === 0 ? (
                <Message variant='info'>No reviews</Message>
              ) : (
                <ListGroup className='mb-3'>
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
              <ListGroup>
                <ListGroup.Item>
                  <h2>Write a Review</h2>
                  {errorReview && (
                    <Message variant='danger'>{errorReview}</Message>
                  )}
                  {authUser ? (
                    <Form onSubmit={createReviewHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary' className='mt-3'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message variant='info'>
                      Please{' '}
                      <Link to={`/login?redirect=/product/${product._id}`}>
                        sign in
                      </Link>{' '}
                      to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
