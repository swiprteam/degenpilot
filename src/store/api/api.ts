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
import { initHistory, select, setTokens, TokenHistory } from "../tokens";
import { setupWeb3modal } from "~/utils/setup-web3modal";
import { setIsInit } from "../app";
import { CACHE_VERSION } from "../middlewares/persist";
import { getItem } from "~/services/persist";
import { ActionInteraction, init as initSwapper } from "../swapper";
const refetchInterval = (fetchingFunction: CallableFunction, timer: number) => {
  return setInterval(fetchingFunction, timer);
};

export const initStore = async (store: EnhancedStore<IRootState>) => {
  const localHistory: TokenHistory = JSON.parse(
    (await getItem(`buy_list_${CACHE_VERSION}`)) ?? `{"left": [],"right": []}`
  );

  store.dispatch(initHistory(localHistory));
  store.dispatch(initSwapper({
    hash: null,
    interaction: ActionInteraction.SWAP
  }))

  try {
    const localChains: ChainInterface[] = JSON.parse(
      (await getItem(`chains_${CACHE_VERSION}`)) ?? "[]"
    );

    const localTokens: TokenInterface[] = JSON.parse(
      (await getItem(`tokens_${CACHE_VERSION}`)) ?? "[]"
    );

    const selectedToken: string =
      (await getItem("selected_token")) ?? localTokens[0].id;

    if (!localChains.length) throw Error("No networks on local");
    if (!localTokens.length) throw new Error("No tokens on local");

    store.dispatch(setChains(localChains.map((n) => new Chain(n))));
    store.dispatch(setTokens(localTokens.map((t) => new Token(t))));
    store.dispatch(select(selectedToken));
    store.dispatch(setWeb3Modal(await setupWeb3modal(localChains)));
    store.dispatch(setIsInit(true));
  } catch (_) {
    Promise.all([
      store.dispatch(fetchChains() as any).unwrap(),
      store.dispatch(fetchTokens() as any).unwrap(),
      store.dispatch(setIsInit(true)),
    ]);
  }

  refetchInterval(() => {
    store.dispatch(fetchTokens() as any);
  }, 1000 * 60 * 30); // 1 minute
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

    const _tokens = data.map((token, _index) => {
      return new Token({
        ...token,
        index: _index,
      });
    });
    dispatch(select(_tokens[0].id));
    return _tokens;
    //return tokens.map((token) => token.toObject()) as TokenInterface[];
  } catch (e) {
    console.error(e);
  }
  return [];
});
