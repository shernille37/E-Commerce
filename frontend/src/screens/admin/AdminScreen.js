import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const AdminScreen = () => {
  const pathName = useLocation().pathname;
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
