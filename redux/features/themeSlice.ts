import { webStorage } from "@/libs/webStorage";
import { TThemeState } from "@/types/theme";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TThemeState = {
  dark: null,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setDark: (state, action) => {
      state.dark = action.payload;
    },
    toggleTheme: (state) => {
      const next = !state.dark;
      state.dark = next;
      webStorage.set("theme", next ? "dark" : "light");
    },
  },
});

export const { setDark, toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
