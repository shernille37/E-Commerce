import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { payOrder } from '../../actions/orderActions';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

import Loader from '../Loader';

const PayPalButton = ({ currency, amount }) => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  const params = useParams();
  const dispatchOrder = useDispatch();

  const orderID = params.id;
  const style = {
    layout: 'vertical',
    color: 'blue',
  };

  useEffect(() => {
    dispatch({
      type: 'resetOptions',
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency]);

  const createOrderHandler = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: amount,
            },
          },
        ],
      })
      .then((orderId) => orderId);
  };

  const successPaymentHandler = (data, actions) => {
    return actions.order.capture().then((paymentResult) => {
      dispatchOrder(payOrder({ orderID, paymentResult }));
    });
  };

  return (
    <>
      {isPending && <Loader />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={createOrderHandler}
        onApprove={successPaymentHandler}
      />
    </>
  );
};

export default PayPalButton;
