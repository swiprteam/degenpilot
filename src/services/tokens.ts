import { Token } from "~/model/token";
import { dispatch, getStoreState } from "~/store";

import {
  swapRight as storeSwapRight,
  swapLeft as storeSwapLeft,
  select,
} from "~/store/tokens";
export const getTokensStore = () => {
  return getStoreState().tokens;
};

export const getTokens = () => {
  return getTokensStore().list;
};

export const getSelectedToken = () => {
  const store = getTokensStore();
  return Token.byId[store.selected];
};

export const next = () => {
  const store = getTokensStore();

  const nextToken = store.list[Token.byId[store.selected].index + 1];

  if (!nextToken) dispatch(select(null));
  else dispatch(select(nextToken.id));
};

export const swapRight = () => {
  dispatch(storeSwapRight());
  next();
};

export const swapLeft = () => {
  dispatch(storeSwapLeft());
  next();
};
