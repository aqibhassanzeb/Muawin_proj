import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import notificationReducer from "./reducers/notification";
import { api } from "../api/api";

export const store = configureStore({
  reducer: {
    authReducer,
    notificationReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: false,
    }).concat(api.middleware),
});
