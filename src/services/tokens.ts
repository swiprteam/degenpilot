import { dispatch, getStoreState } from "~/store";
import {
  swapRight as storeSwapRight,
  swapLeft as storeSwapLeft,
} from "~/store/tokens";

export const getTokensStore = () => {
  return getStoreState().tokens;
};

export const getTokens = () => {
  return getTokensStore().list;
};

export const swapRight = () => {
  return dispatch(storeSwapRight());
};
export const swapLeft = () => {
  return dispatch(storeSwapLeft());
};
