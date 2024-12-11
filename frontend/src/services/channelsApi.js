import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

export const channelsApi = createApi({
  reducerPath: 'channels',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/channels' }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        method: 'POST',
        body: channel,
      }),
    }),
    updateChannel: builder.mutation({
      query: (id, channel) => ({
        url: id,
        method: 'PATCH',
        body: channel,
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetChannelsQuery, useAddChannelMutation, useUpdateChannelMutation, useRemoveChannelMutation } = channelsApi;
