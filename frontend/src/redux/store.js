import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slice/cartSlice";
import userSlice from "./slice/userSlice";
import employeeSlice from './slice/employeeSlice'
import socketSlice from "./slice/socketSlice";
import notifySlice from "./slice/notifySlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    employee: employeeSlice.reducer,
    cart: cartSlice.reducer,
    socket: socketSlice.reducer,
    notify: notifySlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
