import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    loading: false,
  },
  reducers: {
    initLoading: (state) => {
      state.loading = true
    },
    finishLoading: (state) => {
      state.loading = false
    },
  }
})

export const { initLoading, finishLoading } = loadingSlice.actions;