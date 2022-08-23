import React from 'react';
import { Outlet } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const AdminScreen = () => {
  return (
    <>
      <Breadcrumbs />
      <Outlet />
    </>
  );
};

export default AdminScreen;
