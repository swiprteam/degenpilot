import { dispatch, getStoreState } from "~/store";
import {
  swapRight as storeSwapRight,
  swapLeft as storeSwapLeft,
} from "~/store/tokens";
import { TokenInterface } from "~/types/interfaces";

export const getTokensStore = () => {
  return getStoreState().tokens;
};

export const getTokens = () => {
  return getTokensStore().list;
};

export const swapRight = (token: TokenInterface) => {
  return dispatch(storeSwapRight(token));
};
export const swapLeft = (token: TokenInterface) => {
  return dispatch(storeSwapLeft(token));
};
