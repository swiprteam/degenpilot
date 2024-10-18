import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Token } from "~/model/token";
import { SetOnWritePayload, SwapperOperationSwap } from "./interfaces/swapper";
import { VersionedTransaction } from "@solana/web3.js";

export enum ActionInteraction {
  SWAP = "swap",
}

export interface SwapperState {
  debounceTimer: NodeJS.Timeout;
  hash: string;
  is: {
    init: boolean;
    selection: boolean;
    estimationOnprogress: boolean;
    estimationLocked: boolean;
    onWrite: boolean;
    locked: boolean;
  };
  swap: SwapperOperationSwap;
  interaction: ActionInteraction;
}

const initialState: SwapperState = {
  debounceTimer: null,
  hash: null,
  is: {
    init: false,
    selection: false,
    estimationOnprogress: false,
    estimationLocked: false,
    onWrite: true,
    locked: false,
  },
  swap: {
    value: 0,
    to: null,
    transaction: null,
  },
  interaction: ActionInteraction.SWAP,
};

export interface SelectTokenAction {
  token: Token;
  for: "from" | "to";
  interaction?: ActionInteraction;
}
const swapperSlice = createSlice({
  name: "swapper",
  initialState,
  reducers: {
    init: (state, action: PayloadAction<Partial<SwapperState>>) => {
      state.hash = action.payload.hash;
      state.is.init = true;
      state.interaction = action.payload.interaction;
    },
    clearState: (state) => {
      Object.entries(initialState).forEach(([key, value]) => {
        state[key] = value;
      });
    },
    switchSelection: (state) => {
      state.is.selection = !state.is.selection;
    },
    setInteraction: (state, payload: PayloadAction<ActionInteraction>) => {
      state.interaction = payload.payload;
    },
    select: (state, action: PayloadAction<SelectTokenAction>) => {
      state[action.payload.interaction ?? state.interaction][
        action.payload.for
      ] = action.payload.token;
    },
    setFromValue: (state, action: PayloadAction<number>) => {
      state[state.interaction].value = action.payload;
    },
    setEstimationOnprogress: (state, action: PayloadAction<boolean>) => {
      state.is.estimationOnprogress = action.payload;
    },
    setInteractionQuote: (state, action: PayloadAction<VersionedTransaction>) => {
      state[state.interaction].transaction = action.payload;
    },
    lockEstimation: (state) => {
      state.is.estimationLocked = true;
    },
    unlockEstimation: (state) => {
      state.is.estimationLocked = false;
    },
    setOnWrite: (state, action: PayloadAction<SetOnWritePayload>) => {
      state.is.onWrite = action.payload.onWrite;
      state.debounceTimer = action.payload.debounceTimer ?? null;
    },
    setHash: (state, action: PayloadAction<string>) => {
      state.hash = action.payload;
    },
    setLocked: (state, action: PayloadAction<boolean>) => {
      state.is.locked = action.payload;
    },
    setEstimationIsLocked: (state, action: PayloadAction<boolean>) => {
      state.is.estimationLocked = action.payload;
    },
  },
});

export const {
  init,
  select,
  clearState,
  switchSelection,
  setInteraction,
  setFromValue,
  setEstimationOnprogress,
  setInteractionQuote,
  setEstimationIsLocked,
  setOnWrite,
  setLocked,
  setHash,
  lockEstimation,
  unlockEstimation,
} = swapperSlice.actions;
export default swapperSlice.actions;
export const SwapperReducer = swapperSlice.reducer;
