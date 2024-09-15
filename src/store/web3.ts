import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChainInterface } from "~/model/chain";

import { fetchChains } from "./api/api";

export interface Web3State {
  connectedAddress: string | null;
  loading: {
    chains: boolean;
  };
  chains: ChainInterface[];
}

const initialState: Web3State = {
  connectedAddress: null,
  loading: {
    chains: true,
  },
  chains: [],
};

const web3Slice = createSlice({
  name: "web3",
  initialState,
  reducers: {
    setChains: (state, action: PayloadAction<ChainInterface[]>) => {
      state.chains = action.payload;
      state.loading.chains = false;
    },

    setConnectedAddress: (state, action: PayloadAction<`0x${string}`>) => {
      state.connectedAddress = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchChains.pending, (state) => {
        state.loading.chains = true;
      })
      .addCase(fetchChains.fulfilled, (state, action) => {
        state.loading.chains = false;
        state.chains = action.payload;
      });
  },
});

export const { setChains, setConnectedAddress } = web3Slice.actions;

export const Web3Reducer = web3Slice.reducer;
