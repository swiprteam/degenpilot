/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, EnhancedStore } from "@reduxjs/toolkit";
import localforage from "localforage";

import { chains } from "~/utils/chains";
import { IRootState } from "..";
import { setChains } from "../web3";
import { Chain, ChainInterface } from "~/model/chain";

const refetchInterval = (fetchingFunction: CallableFunction, timer: number) => {
  return setInterval(fetchingFunction, timer);
};

export const initStore = async (store: EnhancedStore<IRootState>) => {
  try {
    const localNetworks: ChainInterface[] = JSON.parse(
      (await localforage.getItem("networks")) ?? ""
    );

    if (!localNetworks) throw Error();
    store.dispatch(setChains(localNetworks.map((n) => new Chain(n))));
  } catch (_) {
    Promise.all([store.dispatch(fetchChains() as any).unwrap()]);
  }

  /*refetchInterval(() => {
    store.dispatch(fetchTokens());
  }, 1000 * 60); // 1 minute*/
};

export const fetchChains = createAsyncThunk<ChainInterface[]>(
  "degenpilot/chains",
  async () => {
    return chains;
  }
);
