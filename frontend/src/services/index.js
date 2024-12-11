import { configureStore } from '@reduxjs/toolkit';

import messagesSlice from './messagesSlice.js';
import channelsSlice from './channelsSlice.js';
import authSlice from './authSlice.js';
import uiSlice from './uiSlice.js';

// import { channelsApi } from './channelsApi.js';

const store = configureStore({
  reducer: {
    // [channelsApi.reducerPath]: channelsApi.reducer,
    ui: uiSlice,
    auth: authSlice,
    channels: channelsSlice,
    messages: messagesSlice,
  },
});

export default store;
