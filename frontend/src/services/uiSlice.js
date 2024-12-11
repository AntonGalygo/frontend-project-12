import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';

const initialState = {
  defaultChannelId: '1',
  currentChannelId: '1',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentChannel: (state, { payload }) => ({
      ...state,
      currentChannelId: payload,
      defaultChannelId: '1',
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state) => ({
      ...state,
      currentChannelId: '1',
      defaultChannelId: '1',
    }));
  },
});

export const { setCurrentChannel } = uiSlice.actions;
export default uiSlice.reducer;
