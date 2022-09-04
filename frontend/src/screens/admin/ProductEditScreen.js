import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Modal } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  listProductDetails,
  updateProduct,
  uploadProduct,
} from '../../actions/productActions';

const ProductEditScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');

  const [uploading, setUploading] = useState(false);

  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const user = useSelector((state) => state.user);
  const { authUser } = user;

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error, loadingUpload } = productDetails;

  useEffect(() => {
    if (!(authUser && authUser.isAdmin)) {
      navigate('/login');
    } else if (!product._id || product._id !== id) {
      dispatch(listProductDetails(id));
    } else {
      setName(product.name);
      setPrice(product.price);
      setCategory(product.category);
      setImage(product.image);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setDescription(product.description);
    }
  }, [dispatch, authUser, product]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateProduct({
        id: product._id,
        name,
        price,
        category,
        image,
        countInStock,
        brand,
        description,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append('img', file);

    dispatch(uploadProduct(formData));
  };

  return (
    <Modal show={show} onExited={() => navigate(-1)} onHide={handleClose}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Modal.Header>
            <Modal.Title>Update Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={submitHandler} id='updateProduct'>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='price'>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='image'>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter image url'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='image-file'>
                <Form.Label>Upload Image</Form.Label>

                <Form.Control
                  type='file'
                  label='Choose File'
                  onChange={uploadFileHandler}
                ></Form.Control>
                {loadingUpload && <Loader />}
              </Form.Group>

              <Form.Group controlId='brand'>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter brand'
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='countInStock'>
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter countInStock'
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='category'>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as='select'
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value='laptop'>Laptop</option>
                  <option value='photography'>Photography</option>
                  <option value='mouse'>Mouse</option>
                  <option value='mobile'>Mobile Devices</option>
                  <option value='wearables'>Wearables</option>
                  <option value='gaming'>Gaming</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as='textarea'
                  placeholder='Enter description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button
              variant='primary'
              form='updateProduct'
              type='submit'
              onClick={handleClose}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default ProductEditScreen;
