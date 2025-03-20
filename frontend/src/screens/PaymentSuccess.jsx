import React, { useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { Row, ListGroup, Card } from "react-bootstrap";
import { useUpdateOrderToPaidMutation } from "../slices/ordersApiSlice";
import Loader from "../components/Loader";

import Message from "../components/Message";

const PaymentSuccess = () => {
  const { id: orderId } = useParams();
  const { search } = useLocation();

  const sp = new URLSearchParams(search);
  const sessionId = sp.get("session_id") || "";

  const [updateOrderToPaid, { isLoading, isError, error }] =
    useUpdateOrderToPaidMutation();

  useEffect(() => {
    const updateToPay = async (orderId, sessionId) => {
      try {
        await updateOrderToPaid({ orderId, sessionId }).unwrap();
      } catch (err) {
        console.error(err?.data?.message || err.error);
      }
    };

    updateToPay(orderId, sessionId);
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Card className="text-center">
          <ListGroup variant="flush">
            <ListGroup.Item>
              {!isError ? (
                <>
                  <h2>Payment Success</h2>
                  <Message variant={"success"}>
                    Your order has been successfully paid
                  </Message>
                </>
              ) : (
                <>
                  <h2>Payment Error</h2>
                  <Message variant={"danger"}>{error.data.message}</Message>
                </>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Row>
    </>
  );
};

export default PaymentSuccess;
