import { apiSlice } from "./apiSlice";
import { CHECKOUT_URL, ORDERS_URL } from "../constants";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation({
      query: (order) => ({
        url: `${CHECKOUT_URL}/create-checkout-session`,
        method: "POST",
        body: order,
      }),
    }),
    updateOrderToPaid: builder.mutation({
      query: ({ orderId, sessionId }) => ({
        url: `${ORDERS_URL}/${orderId}/pay?session_id=${sessionId}`,
        method: "PUT",
      }),
    }),

    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/myorders`,
      }),
      keepUnusedDataFor: 5,
    }),

    getOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}`,
      }),
      keepUnusedDataFor: 5,
    }),

    deliverOrder: builder.mutation({
      query: (data) => ({
        url: `${ORDERS_URL}/${data.orderId}/deliver`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useUpdateOrderToPaidMutation,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
} = ordersApiSlice;
