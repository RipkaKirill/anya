import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const doneApi = createApi({
  reducerPath: 'DoneApi',
  tagTypes: ['Done'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://5aad3bced5c2ebb3.mokky.dev' }),
  endpoints: (build) => ({
    getDone: build.query({
      query: () => `done`,
      providesTags: (result) => result
        ? [
          ...result.map(({ id }) => ({ type: 'Done', id })),
          { type: 'Done', id: 'LIST' }
        ]
        : { type: 'Done', id: 'LIST' }
    }),
    addDone: build.mutation({
      query(body) {
        return {
          url: `done`,
          method: 'POST',
          body,
        }
      },
      invalidatesTags: [{ type: 'Done', id: 'LIST' }],
    }),
    deleteDone: build.mutation({
      query: (id) => ({
        url: `done/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Done', id: 'LIST' }]
    }),
  })
})

export const { useGetDoneQuery, useAddDoneMutation, useDeleteDoneMutation } = doneApi 