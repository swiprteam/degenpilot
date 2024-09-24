import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  landing: boolean;
  isInit: boolean;
}

const initialState: AppState = {
  landing: true,
  isInit: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setShowLanding: (state, action: PayloadAction<boolean>) => {
      state.landing = action.payload;
    },
    setIsInit: (state, action: PayloadAction<boolean>) => {
      state.isInit = action.payload;
    },
  },
});

export const { setShowLanding, setIsInit } = appSlice.actions;

export const AppReducer = appSlice.reducer;
