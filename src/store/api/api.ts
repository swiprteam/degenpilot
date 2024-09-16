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
import { setTokens } from "../tokens";
import { setupWeb3modal } from "~/utils/setup-web3modal";
const refetchInterval = (fetchingFunction: CallableFunction, timer: number) => {
  return setInterval(fetchingFunction, timer);
};

export const initStore = async (store: EnhancedStore<IRootState>) => {
  try {
    const localChains: ChainInterface[] = JSON.parse(
      (await localforage.getItem("networks")) ?? "[]"
    );

    const localTokens: TokenInterface[] = JSON.parse(
      (await localforage.getItem("tokens")) ?? "[]"
    );

    if (!localChains.length) throw Error("No networks on local");
    if (!localTokens.length) throw new Error("No tokens on local");
    store.dispatch(setChains(localChains.map((n) => new Chain(n))));
    store.dispatch(setTokens(localTokens.map((t) => new Token(t))));
    store.dispatch(setWeb3Modal(setupWeb3modal(localChains)));
  } catch (_) {
    Promise.all([
      store.dispatch(fetchChains() as any).unwrap(),
      store.dispatch(fetchTokens() as any).unwrap(),
    ]);
  }

  refetchInterval(() => {
    store.dispatch(fetchTokens() as any);
  }, 1000 * 60 * 5); // 1 minute
};

export const fetchChains = createAsyncThunk<ChainInterface[]>(
  "api/chains",
  async () => {
    const config = setupWeb3modal(chains) as any;
    dispatch(setWeb3Modal(config));
    return chains;
  }
);

export const fetchTokens = createAsyncThunk("api/tokens", async () => {
  try {
    const { data } = await axios.get(
      "https://degenpilot-444b684b0668.herokuapp.com/networks/solana/tokens/A8C3xuqscfmyLrte3VmTqrAq8kgMASius9AFNANwpump/report"
    );

    return [data];
  } catch (e) {
    console.error(e);
  }
  return [];
});
