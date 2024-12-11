import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: JSON.parse(localStorage.getItem('username')) || null,
  token: JSON.parse(localStorage.getItem('token')) || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, { payload: { username, token } }) => ({
      ...state,
      username,
      token,
    }),
    logoutUser: (state) => ({
      ...state,
      username: null,
      token: null,
    }),
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
