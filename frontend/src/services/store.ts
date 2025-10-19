import { combineSlices, configureStore } from "@reduxjs/toolkit";
import themeSlice from "./slices/themeSlice";

export const rootReducer = combineSlices({
  theme: themeSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
