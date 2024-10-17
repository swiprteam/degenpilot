import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  isInit: boolean;
  showVideo: boolean;
  showBuy: boolean;
  isFlipped: boolean;
}

const initialState: AppState = {
  isInit: false,
  showVideo: false,
  showBuy: false,
  isFlipped: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsInit: (state, action: PayloadAction<boolean>) => {
      state.isInit = action.payload;
    },
    setShowVideo: (state, action: PayloadAction<boolean>) => {
      state.showVideo = action.payload;
    },
    setShowBuy: (state, action: PayloadAction<boolean>) => {
      state.showBuy = action.payload;
    },
    setIsFliped: (state, action: PayloadAction<boolean>) => {
      state.isFlipped = action.payload;
    },
  },
});

export const { setIsInit, setShowVideo, setShowBuy, setIsFliped } =
  appSlice.actions;

export const AppReducer = appSlice.reducer;
