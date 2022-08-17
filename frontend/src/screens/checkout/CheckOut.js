import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../../components/CheckoutSteps';
import { Outlet } from 'react-router-dom';

const CheckOut = () => {
  const authUser = useSelector((state) => state.user.authUser);
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod } = cart;

  const navigate = useNavigate();

  const step1 = !authUser ? true : false;
  const step2 = authUser ? true : false;
  const step3 = shippingAddress ? true : false;
  const step4 = paymentMethod ? true : false;

  useEffect(() => {
    if (!authUser) navigate('/login?redirect=/checkout');
    else navigate('/checkout/shipping');
  }, [authUser]);

  return (
    <>
      <CheckoutSteps step1={step1} step2={step2} step3={step3} step4={step4} />

      <Outlet />
    </>
  );
};

export default CheckOut;
