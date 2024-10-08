/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, EnhancedStore } from "@reduxjs/toolkit";
import localforage from "localforage";

import { chains } from "~/utils/chains";
import { dispatch, IRootState } from "..";
import { setChains, setWeb3Modal } from "../web3";
import { Chain } from "~/model/chain";
import axios from "axios";
import { ChainInterface, TokenInterface } from "~/types/interfaces";
import { Token } from "~/model/token";
import { initHistory, setTokens, TokenHistory } from "../tokens";
import { setupWeb3modal } from "~/utils/setup-web3modal";
import { setIsInit, setShowLanding } from "../app";
import { CACHE_VERSION } from "../middlewares/persist";
const refetchInterval = (fetchingFunction: CallableFunction, timer: number) => {
  return setInterval(fetchingFunction, timer);
};

export const initStore = async (store: EnhancedStore<IRootState>) => {
  const localHistory: TokenHistory = JSON.parse(
    (await localforage.getItem(`history_${CACHE_VERSION}`)) ??
      `{"left": [],"right": []}`
  );

  const landing: boolean = await localforage.getItem("landing");

  store.dispatch(setShowLanding(landing));
  store.dispatch(initHistory(localHistory));
  try {
    const localChains: ChainInterface[] = JSON.parse(
      (await localforage.getItem(`chains_${CACHE_VERSION}`)) ?? "[]"
    );

    const localTokens: TokenInterface[] = JSON.parse(
      (await localforage.getItem(`tokens_${CACHE_VERSION}`)) ?? "[]"
    );

    if (!localChains.length) throw Error("No networks on local");
    if (!localTokens.length) throw new Error("No tokens on local");
    store.dispatch(setChains(localChains.map((n) => new Chain(n))));
    store.dispatch(setTokens(localTokens.map((t) => new Token(t))));
    store.dispatch(setWeb3Modal(await setupWeb3modal(localChains)));
    store.dispatch(setIsInit(true));
  } catch (_) {
    Promise.all([
      store.dispatch(setShowLanding(true)),
      store.dispatch(fetchChains() as any).unwrap(),
      store.dispatch(fetchTokens() as any).unwrap(),
      store.dispatch(setIsInit(true)),
    ]);
  }

  refetchInterval(() => {
    store.dispatch(fetchTokens() as any);
  }, 1000 * 60 * 5); // 1 minute
};

export const fetchChains = createAsyncThunk<ChainInterface[]>(
  "api/chains",
  async () => {
    const config = (await setupWeb3modal(chains)) as any;
    dispatch(setWeb3Modal(config));
    return chains;
  }
);

export const fetchTokens = createAsyncThunk("api/tokens", async () => {
  try {
    const { data } = await axios.get(
      "https://swipr-api-d30d3b6ad1d2.herokuapp.com/tokens"
    );

    const tokens = data.map((token) => new Token(token));
    console.log("🚀 ~ fetchTokens ~ tokens:", tokens);

    return tokens.map((token) => token.toObject()) as TokenInterface[];
  } catch (e) {
    console.error(e);
  }
  return [];
});
