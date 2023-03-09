import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const menuItemApi = createApi({
  reducerPath: 'menuItemApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7054/api/',
  }),
  tagTypes: ['MenuItems'],
  endpoints: (builder) => ({
    getMenuItems: builder.query({
      query: () => ({
        url: 'menuitem',
      }),
      providesTags: ['MenuItems'],
    }),
    getMenuItemById: builder.query({
      query: (id) => ({
        url: `menuitem/${id}`,
      }),
      providesTags: ['MenuItems'],
    }),
    updateMenuItem: builder.mutation({
      query: ({ data, id }) => ({
        url: 'menuitem/' + id,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['MenuItems'],
    }),
    createMenuItem: builder.mutation({
      query: ( data ) => ({
        url: 'menuitem/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['MenuItems'],
    }),
    deleteMenuItem: builder.mutation({
      query: ({ id }) => ({
        url: 'menuitem/' + id,
        method: 'DELETE',
      }),
      invalidatesTags: ['MenuItems'],
    }),
  }),
});

export const {
  useGetMenuItemsQuery,
  useGetMenuItemByIdQuery,
  useCreateMenuItemMutation,
  useDeleteMenuItemMutation,
  useUpdateMenuItemMutation,
} = menuItemApi;
export default menuItemApi;
