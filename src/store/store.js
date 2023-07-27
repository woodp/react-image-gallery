import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from './slices/authSlice.js'
import { errorsSlice } from './slices/errorsSlice.js'
import { imagesSlice } from "./slices/imagesSlice.js";
import { loadingSlice } from "./slices/loadingSlice.js";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    errors: errorsSlice.reducer,
    images: imagesSlice.reducer,
    loading: loadingSlice.reducer
  }
})