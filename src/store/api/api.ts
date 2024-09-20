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
const refetchInterval = (fetchingFunction: CallableFunction, timer: number) => {
  return setInterval(fetchingFunction, timer);
};

export const initStore = async (store: EnhancedStore<IRootState>) => {
  const localHistory: TokenHistory = JSON.parse(
    (await localforage.getItem("history")) ?? `{"left": [],"right": []}`
  );

  store.dispatch(initHistory(localHistory));
  try {
    const localChains: ChainInterface[] = JSON.parse(
      (await localforage.getItem("chains")) ?? "[]"
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
    console.log("🚀 ~ initStore ~ _:", _);
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
    /*const { data } = await axios.get(
      "https://swipr-api-d30d3b6ad1d2.herokuapp.com/tokens"
    );*/

    const data = [
      {
        _id: "YcUzxsUL4wTETS1qWe5HsgCHNaQz9wddcoL2L62xn7k",
        info: {
          name: "Half of Pepe",
          symbol: "PE",
          address: "YcUzxsUL4wTETS1qWe5HsgCHNaQz9wddcoL2L62xn7k",
          imageUrl:
            "https://coin-images.coingecko.com/coins/images/40114/small/cmDeEncE_400x4w00.jpg?1725829004",
          h24Change: 0,
          h6Change: 0,
          decimals: 0,
          chainId: 0,
          rooterContract: "",
        },
        links: {
          website: "https://halfofpepe.com",
          twitter: "https://twitter.com/halfofpepe_sol",
          telegram: "https://t.me/halfofpepe_sol",
          discord: null,
        },
        score: {
          value: 90,
          title: "Outstanding!!",
          color: "#3eff00",
          details: {
            pros: ["Supply is not centralized "],
            cons: ["Very recent deployment"],
          },
        },
      },
      {
        _id: "4aL5GLRuzsnJjJWNdXK7TPTVpGhP6PyV4ZhyQiyxpump",
        info: {
          name: "Good Morning!",
          symbol: "GM",
          address: "4aL5GLRuzsnJjJWNdXK7TPTVpGhP6PyV4ZhyQiyxpump",
          imageUrl:
            "https://coin-images.coingecko.com/coins/images/39610/small/cmc-200x200.png?1723092378",
          h24Change: 0,
          h6Change: 0,
          decimals: 0,
          chainId: 0,
          rooterContract: "",
        },
        links: {
          website: "https://www.itsalwaysgm.com",
          twitter: "https://twitter.com/itsalwaysgm",
          telegram: "https://t.me/itsalwaysgm",
          discord: null,
        },
        score: {
          value: 90,
          title: "Outstanding!!",
          color: "#3eff00",
          details: {
            pros: ["Supply is not centralized "],
            cons: ["Very recent deployment"],
          },
        },
      },
      {
        _id: "ke7MBNmmhXDegLgAbaVboquYiPYb1SagGpSazDapump",
        info: {
          name: "Bwull",
          symbol: "BWULL",
          address: "ke7MBNmmhXDegLgAbaVboquYiPYb1SagGpSazDapump",
          imageUrl:
            "https://coin-images.coingecko.com/coins/images/50181/small/Bwull.png?1726166210",
          h24Change: 0,
          h6Change: 0,
          decimals: 0,
          chainId: 0,
          rooterContract: "",
        },
        links: {
          website: "https://www.bwull.com",
          twitter: "https://twitter.com/bwullonsol",
          telegram: "https://t.me/bwullonsol",
          discord: null,
        },
        score: {
          value: 90,
          title: "Outstanding!!",
          color: "#3eff00",
          details: {
            pros: ["Supply is not centralized "],
            cons: ["Very recent deployment"],
          },
        },
      },
      {
        _id: "7M9KJcPNC65ShLDmJmTNhVFcuY95Y1VMeYngKgt67D1t",
        info: {
          name: "reddit dog",
          symbol: "r/snoofi",
          address: "7M9KJcPNC65ShLDmJmTNhVFcuY95Y1VMeYngKgt67D1t",
          imageUrl:
            "https://coin-images.coingecko.com/coins/images/39826/small/r_snoofi.png?1724204843",
          h24Change: 0,
          h6Change: 0,
          decimals: 0,
          chainId: 0,
          rooterContract: "",
        },
        links: {
          website: "https://www.reddit.com/r/snoofi",
          twitter: null,
          telegram: null,
          discord: null,
        },
        score: {
          value: 95,
          title: "Excellent!!!",
          color: "#13ff02",
          details: {
            pros: ["Supply is not centralized "],
            cons: ["Very recent deployment"],
          },
        },
      },
      {
        _id: "3TWgDvYBL2YPET2LxnWAwsMeoA8aL4DutNuwat2pKCjC",
        info: {
          name: "KittenHaimer",
          symbol: "KHAI",
          address: "3TWgDvYBL2YPET2LxnWAwsMeoA8aL4DutNuwat2pKCjC",
          imageUrl:
            "https://coin-images.coingecko.com/coins/images/35900/small/LOGO_200.jpg?1710165599",
          h24Change: 0,
          h6Change: 0,
          decimals: 0,
          chainId: 0,
          rooterContract: "",
        },
        links: {
          website: "https://kittenhaimer.ai",
          twitter: "https://twitter.com/KittenHaimer",
          telegram: "https://t.me/KittenHaimer",
          discord: null,
        },
        score: {
          value: 85,
          title: "Outstanding!!",
          color: "#3eff00",
          details: {
            pros: ["Supply is not centralized "],
            cons: ["Very recent deployment"],
          },
        },
      },
      {
        _id: "3B5wuUrMEi5yATD7on46hKfej3pfmd7t1RKgrsN3pump",
        info: {
          name: "BILLY",
          symbol: "BILLY",
          address: "3B5wuUrMEi5yATD7on46hKfej3pfmd7t1RKgrsN3pump",
          imageUrl:
            "https://coin-images.coingecko.com/coins/images/38745/small/BILLY.jpg?1718680214",
          h24Change: 0,
          h6Change: 0,
          decimals: 0,
          chainId: 0,
          rooterContract: "",
        },
        links: {
          website: "https://billysol.lol",
          twitter: "https://twitter.com/billycoinsolana",
          telegram: "https://t.me/billycoinsolana",
          discord: null,
        },
        score: {
          value: 95,
          title: "Excellent!!!",
          color: "#13ff02",
          details: {
            pros: ["Supply is not centralized "],
            cons: ["Very recent deployment"],
          },
        },
      },
      {
        _id: "2JcXacFwt9mVAwBQ5nZkYwCyXQkRcdsYrDXn6hj22SbP",
        info: {
          name: "mini",
          symbol: "mini",
          address: "2JcXacFwt9mVAwBQ5nZkYwCyXQkRcdsYrDXn6hj22SbP",
          imageUrl:
            "https://coin-images.coingecko.com/coins/images/37777/small/image_%284%29.png?1715581636",
          h24Change: 0,
          h6Change: 0,
          decimals: 0,
          chainId: 0,
          rooterContract: "",
        },
        links: {
          website: "https://minimini.lol",
          twitter: "https://twitter.com/minigangsol",
          telegram: "https://t.me/minigangsol",
          discord: null,
        },
        score: {
          value: 90,
          title: "Outstanding!!",
          color: "#3eff00",
          details: {
            pros: ["Supply is not centralized "],
            cons: ["Very recent deployment"],
          },
        },
      },
      {
        _id: "CTg3ZgYx79zrE1MteDVkmkcGniiFrK1hJ6yiabropump",
        info: {
          name: "Neiro",
          symbol: "NEIRO",
          address: "CTg3ZgYx79zrE1MteDVkmkcGniiFrK1hJ6yiabropump",
          imageUrl:
            "https://coin-images.coingecko.com/coins/images/39412/small/1AD6C3F3-F061-4994-8AF6-327C3329E0D8.jpeg?1722795634",
          h24Change: 0,
          h6Change: 0,
          decimals: 0,
          chainId: 0,
          rooterContract: "",
        },
        links: {
          website: "https://neirobropump.com",
          twitter: "https://twitter.com/neirowoof",
          telegram: "https://t.me/neirowoof",
          discord: null,
        },
        score: {
          value: 95,
          title: "Excellent!!!",
          color: "#13ff02",
          details: {
            pros: ["Supply is not centralized "],
            cons: ["Very recent deployment"],
          },
        },
      },
      {
        _id: "DtR4D9FtVoTX2569gaL837ZgrB6wNjj6tkmnX9Rdk9B2",
        info: {
          name: "aura",
          symbol: "aura",
          address: "DtR4D9FtVoTX2569gaL837ZgrB6wNjj6tkmnX9Rdk9B2",
          imageUrl:
            "https://coin-images.coingecko.com/coins/images/38376/small/aura_pfp.png?1717309607",
          h24Change: 0,
          h6Change: 0,
          decimals: 0,
          chainId: 0,
          rooterContract: "",
        },
        links: {
          website: "https://auraonsol.com",
          twitter: null,
          telegram: "https://t.me/null",
          discord: null,
        },
        score: {
          value: 95,
          title: "Excellent!!!",
          color: "#13ff02",
          details: {
            pros: ["Supply is not centralized "],
            cons: ["Very recent deployment"],
          },
        },
      },
    ];
    const tokens = data.map((token) => new Token(token));

    return tokens.map((token) => token.toObject()) as TokenInterface[];
  } catch (e) {
    console.error(e);
  }
  return [];
});
