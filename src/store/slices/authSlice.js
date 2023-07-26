import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'not-authenticated',
    user: undefined,
    images: [],
  },
  reducers: {
    login: (state, {payload}) => {
      state.status = 'authenticated'
      state.user = payload
      state.images = []
    },
    logout: (state) => {
      state.status = 'not-authenticated'
      state.user = undefined
      state.images = []
    },
  }
});

export const { login, logout } = authSlice.actions;