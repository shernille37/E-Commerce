import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { getProfile, updateProfile } from '../../actions/userActions';

const UserEditScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const user = useSelector((state) => state.user);
  const { userDetails, authUser, loading, error } = user;

  useEffect(() => {
    if (!authUser) {
      navigate('/login');
    } else if (!userDetails || userDetails._id !== id) {
      dispatch(getProfile(id));
    } else {
      setName(userDetails.name);
      setEmail(userDetails.email);
      setIsAdmin(userDetails.isAdmin);
    }
  }, [dispatch, authUser, userDetails]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateProfile({ id, name, email, isAdmin }));
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
            <Modal.Title>Update User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={submitHandler} id='updateUser'>
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

              <Form.Group controlId='isAdmin'>
                <Form.Check
                  type='checkbox'
                  label='Is Admin'
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                ></Form.Check>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button
              variant='primary'
              form='updateUser'
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

export default UserEditScreen;
