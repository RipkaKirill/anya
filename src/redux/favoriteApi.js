import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const favoriteApi = createApi({
  reducerPath: 'favoriteApi',
  tagTypes: ['Favorite'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://5aad3bced5c2ebb3.mokky.dev' }),
  endpoints: (build) => ({
    getFavorite: build.query({
      query: () => `favorite`,
      providesTags: (result) => result
        ? [
          ...result.map(({ id }) => ({ type: 'Favorite', id })),
          { type: 'Favorite', id: 'LIST' }
        ]
        : { type: 'Favorite', id: 'LIST' }
    }),
    addFavorite: build.mutation({
      query(body) {
        return {
          url: `favorite`,
          method: 'POST',
          body,
        }
      },
      invalidatesTags: [{ type: 'Favorite', id: 'LIST' }],
    }),
    deleteFavorite: build.mutation({
      query: (id) => ({
        url: `favorite/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Favorite', id: 'LIST' }]
    }),
  })
})

export const { useGetFavoriteQuery, useAddFavoriteMutation, useDeleteFavoriteMutation } = favoriteApi 