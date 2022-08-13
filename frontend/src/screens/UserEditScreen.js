import React, { useState, useEffect } from 'react';
import {
  Link,
  useSearchParams,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getProfile } from '../actions/userActions';

const UserEditScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useSearchParams();
  const { id } = useParams();

  const user = useSelector((state) => state.user);
  const { userDetails, authUser, loading, error } = user;

  const redirect = search.get('redirect') ? search.get('redirect') : '/';

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
  }, [navigate, authUser, redirect, userDetails]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit User</h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
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

            <Form.Group controlId='isAdmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                required
              ></Form.Check>
            </Form.Group>

            <Button className='mt-2' type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
