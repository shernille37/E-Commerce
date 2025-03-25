import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Outlet, useLocation } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const AdminScreen = () => {
  const pathName = useLocation().pathname;
  const navigate = useNavigate();

  const authUser = useSelector((state) => state.user.authUser);

  useEffect(() => {
    if (!authUser) navigate('/');
  }, [authUser]);

  return (
    <>
      <Breadcrumbs />
      {pathName === '/admin' && (
        <h2 className='text-center mt-5'>Please select a field to visualize</h2>
      )}
      <Outlet />
    </>
  );
};

export default AdminScreen;
