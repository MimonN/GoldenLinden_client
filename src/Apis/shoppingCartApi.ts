import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const shoppingCartApi = createApi({
  reducerPath: 'shoppingCartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + 'api/',
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem('token');
      token && headers.append('Authorization', 'Bearer ' + token);
    },
  }),
  tagTypes: ['ShoppingCarts'],
  endpoints: (builder) => ({
    getShoppingCart: builder.query({
      query: (userId) => ({
        url: `shoppingCart`,
        params: {
          userId: userId,
        },
      }),
      providesTags: ['ShoppingCarts'],
    }),
    updateShoppingCart: builder.mutation({
      query: ({ menuItemId, updateQuantityBy, userId }) => ({
        url: 'shoppingCart',
        method: 'POST',
        params: {
          menuItemId,
          updateQuantityBy,
          userId,
        },
      }),
      invalidatesTags: ['ShoppingCarts'],
    }),
  }),
});

export const { useGetShoppingCartQuery, useUpdateShoppingCartMutation } =
  shoppingCartApi;
export default shoppingCartApi;
