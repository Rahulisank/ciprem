import { configureStore } from "@reduxjs/toolkit";
import ModalSlice from "./slices/ModalSlice";

export const store = configureStore({
  reducer: {
    ModalSlice,
  },
});
