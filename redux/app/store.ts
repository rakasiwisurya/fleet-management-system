import { configureStore } from "@reduxjs/toolkit";
import { listReducer } from "../features/listSlice";
import { themeReducer } from "../features/themeSlice";
import { vehicleReducer } from "../features/vehicleSlice";

const store = configureStore({
  reducer: {
    vehicle: vehicleReducer,
    theme: themeReducer,
    list: listReducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
