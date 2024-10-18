import { createSelector } from "@reduxjs/toolkit";
import { VersionedTransaction } from "@solana/web3.js";
import { IRootState, dispatch, getStoreState } from "~/store";
import { SetOnWritePayload } from "~/store/interfaces/swapper";
import {
  canSwapSelector,
  swapTransactionSelector,
} from "~/store/selectors/swapper";
import swapperActions, {
  ActionInteraction,
  SelectTokenAction,
  SwapperState,
} from "~/store/swapper";


export const getSwapperStore = () => getStoreState().swapper;

export const getIsInit = () => getSwapperStore().is.init;
export const getIsSelection = () => getSwapperStore().is.selection;
export const getInteraction = () => getSwapperStore().interaction;


export const getToToken = () => {
  const store = getSwapperStore();
  const interaction = store.interaction;
  return store[interaction].to;
};

export const getFromValue = () => {
  const store = getSwapperStore();
  const interaction = store.interaction;
  return store[interaction].value;
};

export const getCanSwap = () => {
  const state = getStoreState();
  return canSwapSelector(state);
};

export const initSwapper = (state: Partial<SwapperState>) => {
  return dispatch(swapperActions.init(state));
};

export const selectToken = (action: SelectTokenAction) => {
  return dispatch(swapperActions.select(action));
};

export const setHash = (hash: string) => {
  dispatch(swapperActions.setHash(hash));
};

export const switchSelection = () => {
  dispatch(swapperActions.switchSelection());
};

export const setInteraction = (interaction: ActionInteraction) => {
  dispatch(swapperActions.setInteraction(interaction));
};

export const setEstimationIsLocked = (value: boolean) => {
  dispatch(swapperActions.setEstimationIsLocked(value));
};

export const lockEstimation = () => {
  dispatch(swapperActions.setLocked(true));
};
export const unlockEstimation = () => {
  dispatch(swapperActions.setLocked(false));
};
export const setFromValue = (value: number) => {
  dispatch(swapperActions.setFromValue(value));
};

export const getEstimationOnProgress = () => {
  const selector = createSelector(
    (state: IRootState) => state.swapper,
    (state) => state.is.estimationOnprogress
  );
  return selector(getStoreState());
};
export const setEstimationOnprogress = (value: boolean) => {
  dispatch(swapperActions.setEstimationOnprogress(value));
};

export const setInteractionTransaction = (transaction:VersionedTransaction) => {
  dispatch(swapperActions.setInteractionQuote(transaction));
};

export const setOnWrite = (value: SetOnWritePayload) => {
  dispatch(swapperActions.setOnWrite(value));
};

export const getSwapTransaction = () => {
  const state = getStoreState();
  return swapTransactionSelector(state);
};
