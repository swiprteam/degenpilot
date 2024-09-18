import { Token } from "~/model/token";
import { dispatch, getStoreState } from "~/store";
import { setSelected } from "~/store/tokens";

export const getTokensStore = () => {
  return getStoreState().tokens;
};

export const getTokens = () => {
  return getTokensStore().list;
};

export const getSelectedToken = () => {
  const store = getTokensStore();
  return new Token(store.list[store.selected]);
};

export const selectNext = () => {
  const store = getTokensStore();
  return dispatch(setSelected(store.selected + 1));
};
