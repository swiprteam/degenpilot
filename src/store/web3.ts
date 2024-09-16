import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createWeb3Modal, defaultSolanaConfig } from "@web3modal/solana/react";
import { solana, solanaTestnet, solanaDevnet } from "@web3modal/solana/chains";
import { fetchChains } from "./api/api";
import { ChainInterface } from "~/types/interfaces";

type Web3ModalConfig = ReturnType<typeof defaultSolanaConfig>;
export interface Web3State {
  connectedAddress: string | null;
  loading: {
    chains: boolean;
    web3ModalConfig: boolean;
  };
  chains: ChainInterface[];
  config: Web3ModalConfig | null;
}

const initialState: Web3State = {
  connectedAddress: null,
  loading: {
    chains: true,
    web3ModalConfig: true,
  },
  chains: [],
  config: null,
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
