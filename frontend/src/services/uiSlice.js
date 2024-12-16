import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';

const initialState = {
  currentChannelId: '1',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentChannel: (state, { payload }) => ({
      ...state,
      currentChannelId: payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state) => ({
      ...state,
      currentChannelId: '1',
    }));
  },
});

export const { setCurrentChannel } = uiSlice.actions;
export default uiSlice.reducer;
