import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  isInit: boolean;
  showVideo: boolean;
  showBuy: boolean;
}

const initialState: AppState = {
  isInit: false,
  showVideo: false,
  showBuy: false,
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
  },
});

export const { setIsInit, setShowVideo, setShowBuy } = appSlice.actions;

export const AppReducer = appSlice.reducer;
