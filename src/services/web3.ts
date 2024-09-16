import { getStoreState } from "~/store";
import {
  chainsIsLoadingSelector,
  chainsSelector,
} from "~/store/selectors/web3";

export const getWeb3State = () => getStoreState().web3;

export const getChainsIsLoding = () => {
  const state = getStoreState();
  return chainsIsLoadingSelector(state);
};

export const getChains = () => {
  const state = getStoreState();

  return chainsSelector(state);
};
