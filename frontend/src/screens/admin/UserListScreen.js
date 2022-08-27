import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { getAllUsers, deleteUser } from '../../actions/userActions';
import {
  resetDeleteSuccess,
  resetUpdateSuccess,
} from '../../reducers/userReducers';

const UserListScreen = () => {
  const user = useSelector((state) => state.user);

  const {
    authUser,
    userList,
    loading,
    error,
    loadingUpdate,
    successDelete,
    loadingDelete,
    successUpdate,
  } = user;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!(authUser && authUser.isAdmin)) {
      navigate('/login');
    } else {
      dispatch(getAllUsers());
    }
  }, [dispatch, authUser]);

  useEffect(() => {
    if (successUpdate) dispatch(getAllUsers());
    if (successDelete || successUpdate) {
      setTimeout(() => {
        dispatch(resetDeleteSuccess());
        dispatch(resetUpdateSuccess());
      }, 3000);
    }
  }, [dispatch, successDelete, successUpdate]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : userList.length === 0 ? (
        <Message variant='info'>No users in the database</Message>
      ) : (
        <>
          {}
          {loadingUpdate && <Message variant='info'>Updating</Message>}
          {loadingDelete && <Message variant='info'>Deleting...</Message>}
          {successUpdate && (
            <Message variant='success'>Profile Updated</Message>
          )}
          {successDelete && <Message variant='success'>User Deleted</Message>}

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
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {userList.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    {' '}
                    <a href={`malto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className='fas fa-check'
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>

                  <td>
                    <LinkContainer to={`${user._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>

                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Outlet />
        </>
      )}
    </>
  );
};

export default UserListScreen;
