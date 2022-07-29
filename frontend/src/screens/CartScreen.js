import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';

const CartScreen = () => {
  const dispatch = useDispatch();

  const params = useParams();
  const [qtyParams, setQtyParams] = useSearchParams();

  useEffect(() => {
    dispatch(
      addToCart({
        id: params.id,
        qty: qtyParams.get('qty'),
      })
    );
  }, [dispatch]);

  return <div>cartScreen</div>;
};

export default CartScreen;
