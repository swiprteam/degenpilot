import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createWeb3Modal, defaultSolanaConfig } from "@web3modal/solana/react";
import { ChainInterface } from "~/types/interfaces";
import { Web3ModalConfig } from "~/utils/setup-web3modal";
import { fetchChains } from "./api/api";

type SolanaConfig = ReturnType<typeof defaultSolanaConfig>;
type SolanaWeb3Modal = ReturnType<typeof createWeb3Modal>;

export interface Web3State {
  connectedAddress: string | null;
  loading: {
    chains: boolean;
    web3Modal: boolean;
  };
  chains: ChainInterface[];
  web3Modal: {
    config: SolanaConfig | null;
    instance: SolanaWeb3Modal | null;
  };
}

const initialState: Web3State = {
  connectedAddress: null,
  loading: {
    chains: true,
    web3Modal: true,
  },
  chains: [],
  web3Modal: {
    config: null,
    instance: null,
  },
};

const web3Slice = createSlice({
  name: "web3",
  initialState,
  reducers: {
    setChains: (state, action: PayloadAction<ChainInterface[]>) => {
      state.chains = action.payload;
      state.loading.chains = false;
    },

    setConnectedAddress: (state, action: PayloadAction<string | null>) => {
      state.connectedAddress = action.payload;
    },
    setWeb3Modal: (state, action: PayloadAction<Web3ModalConfig>) => {
      const { solana } = action.payload;
      state.web3Modal.instance = solana.instance as any;
      state.web3Modal.config = solana.config;
      state.loading.web3Modal = false;
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

export const { setChains, setConnectedAddress, setWeb3Modal } =
  web3Slice.actions;

export const Web3Reducer = web3Slice.reducer;
