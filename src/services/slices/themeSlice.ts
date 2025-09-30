import { createSlice } from "@reduxjs/toolkit";
import type { TTheme } from "../../types/types";

type ThemeState = {
  theme: TTheme;
};

const getInitialTheme = (): TTheme => {
  const savedTheme = localStorage.getItem("theme") as "light" | "dark";
  if (savedTheme) return savedTheme;

  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
};

const initialState: ThemeState = {
  theme: getInitialTheme(),
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  selectors: {
    selectTheme: (state) => state.theme,
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme);
      document.documentElement.className = state.theme;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
      document.documentElement.className = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export const { selectTheme } = themeSlice.selectors;
export default themeSlice.reducer;
