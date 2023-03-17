import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + 'api/',
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem('token');
      token && headers.append('Authorization', 'Bearer ' + token);
    },
  }),
  endpoints: (builder) => ({
    initialPayment: builder.mutation({
      query: (userId) => ({
        url: 'payment',
        method: 'POST',
        params: {
          userId: userId,
        },
      }),
    }),
  }),
});

export const { useInitialPaymentMutation } = paymentApi;
export default paymentApi;
