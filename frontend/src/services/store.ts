import { combineSlices, configureStore } from "@reduxjs/toolkit";
import themeSlice from "./slices/themeSlice";
import { userSlice } from "./slices/userSlice";
import {
  type TypedUseSelectorHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineSlices({
  theme: themeSlice,
  user: userSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
