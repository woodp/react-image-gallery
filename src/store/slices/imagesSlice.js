import { createSlice } from "@reduxjs/toolkit";

export const imagesSlice = createSlice({
  name: 'images',
  initialState: {
    images: [],
  },
  reducers: {
    setImages: (state, {payload}) => {
      state.images = payload
    }
  }
})

export const { setImages } = imagesSlice.actions;