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
      (await localforage.getItem("chains")) ?? "[]"
    );
    console.log("🚀 ~ initStore ~ localChains:", localChains);

    const localTokens: TokenInterface[] = JSON.parse(
      (await localforage.getItem("tokens")) ?? "[]"
    );
    console.log("🚀 ~ initStore ~ localTokens:", localTokens);

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
    const { data } = await axios.get(
      "https://degenpilot-444b684b0668.herokuapp.com/networks/solana/tokens/A8C3xuqscfmyLrte3VmTqrAq8kgMASius9AFNANwpump/report"
    );

    const fakeTokens = [
      {
        score: {
          score: 95,
          details: {
            social: {
              sentiment: { ssePenalty: 0 },
              smartEngagement: { ssePenalty: 0 },
              mindshare: { ssePenalty: 0 },
            },
            dailyVolumePercentage: 15,
            liquidityPercentage: 7.3,
            top10HolderPercentage: 0.125,
            mintAuthority: "ma:undefined",
            freezeAuthority: "fa:undefined",
            creationDatePenalty: 5,
          },
        },
        meta: {
          name: "TOKA",
          symbol: "TOKA",
          address: "A1B2C3D4E5F6G7H8I9J0KLMNOPQRS",
          image: "https://fakeimages.com/token1.png",
          creationDate: "2024-07-30T01:22:14.000Z",
        },
        financial: {
          supply: 987654321.123456,
          price: "0.054321",
          marketCap: 53678942.55,
        },
        social: {
          discord: null,
          twitter: "https://twitter.com/faketok1",
          telegram: "https://t.me/faketok1",
          website: "https://faketok1.xyz",
        },
        poolsAggregation: {
          total: {
            liquidity: 4237892.45,
            volume: {
              hour: 301245.67,
              day: 11023456.78,
            },
            poolsLength: 200,
          },
        },
      },
      {
        score: {
          score: 90,
          details: {
            social: {
              sentiment: { ssePenalty: 0 },
              smartEngagement: { ssePenalty: 0 },
              mindshare: { ssePenalty: 0 },
            },
            dailyVolumePercentage: 18,
            liquidityPercentage: 6.7,
            top10HolderPercentage: 0.135,
            mintAuthority: "ma:undefined",
            freezeAuthority: "fa:undefined",
            creationDatePenalty: 3,
          },
        },
        meta: {
          name: "FAKEB",
          symbol: "FAKEB",
          address: "B1C2D3E4F5G6H7I8J9KLMNOPQRST",
          image: "https://fakeimages.com/token2.png",
          creationDate: "2024-06-20T10:12:34.000Z",
        },
        financial: {
          supply: 876543210.987654,
          price: "0.034567",
          marketCap: 30345678.9,
        },
        social: {
          discord: null,
          twitter: "https://twitter.com/faketok2",
          telegram: "https://t.me/faketok2",
          website: "https://faketok2.xyz",
        },
        poolsAggregation: {
          total: {
            liquidity: 3789234.23,
            volume: {
              hour: 256789.12,
              day: 10234567.89,
            },
            poolsLength: 190,
          },
        },
      },
      {
        score: {
          score: 88,
          details: {
            social: {
              sentiment: { ssePenalty: 0 },
              smartEngagement: { ssePenalty: 0 },
              mindshare: { ssePenalty: 0 },
            },
            dailyVolumePercentage: 14,
            liquidityPercentage: 6.2,
            top10HolderPercentage: 0.145,
            mintAuthority: "ma:undefined",
            freezeAuthority: "fa:undefined",
            creationDatePenalty: 2,
          },
        },
        meta: {
          name: "FAKEC",
          symbol: "FAKEC",
          address: "C1D2E3F4G5H6I7J8KLMNOPQRSTU",
          image: "https://fakeimages.com/token3.png",
          creationDate: "2024-08-15T12:45:23.000Z",
        },
        financial: {
          supply: 765432109.876543,
          price: "0.043210",
          marketCap: 32987654.32,
        },
        social: {
          discord: null,
          twitter: "https://twitter.com/faketok3",
          telegram: "https://t.me/faketok3",
          website: "https://faketok3.xyz",
        },
        poolsAggregation: {
          total: {
            liquidity: 2987654.12,
            volume: {
              hour: 234567.89,
              day: 9876543.21,
            },
            poolsLength: 180,
          },
        },
      },
      {
        score: {
          score: 92,
          details: {
            social: {
              sentiment: { ssePenalty: 0 },
              smartEngagement: { ssePenalty: 0 },
              mindshare: { ssePenalty: 0 },
            },
            dailyVolumePercentage: 16,
            liquidityPercentage: 8.0,
            top10HolderPercentage: 0.12,
            mintAuthority: "ma:undefined",
            freezeAuthority: "fa:undefined",
            creationDatePenalty: 1,
          },
        },
        meta: {
          name: "FAKED",
          symbol: "FAKED",
          address: "D1E2F3G4H5I6J7K8LMNOPQRSTUV",
          image: "https://fakeimages.com/token4.png",
          creationDate: "2024-05-10T08:34:12.000Z",
        },
        financial: {
          supply: 654321098.765432,
          price: "0.065432",
          marketCap: 42876543.21,
        },
        social: {
          discord: null,
          twitter: "https://twitter.com/faketok4",
          telegram: "https://t.me/faketok4",
          website: "https://faketok4.xyz",
        },
        poolsAggregation: {
          total: {
            liquidity: 3678901.23,
            volume: {
              hour: 278901.34,
              day: 9876543.21,
            },
            poolsLength: 160,
          },
        },
      },
      {
        score: {
          score: 89,
          details: {
            social: {
              sentiment: { ssePenalty: 0 },
              smartEngagement: { ssePenalty: 0 },
              mindshare: { ssePenalty: 0 },
            },
            dailyVolumePercentage: 13,
            liquidityPercentage: 7.8,
            top10HolderPercentage: 0.112,
            mintAuthority: "ma:undefined",
            freezeAuthority: "fa:undefined",
            creationDatePenalty: 4,
          },
        },
        meta: {
          name: "FAKEE",
          symbol: "FAKEE",
          address: "E1F2G3H4I5J6K7LMNOPQRSTUVWX",
          image: "https://fakeimages.com/token5.png",
          creationDate: "2024-09-01T14:23:11.000Z",
        },
        financial: {
          supply: 543210987.654321,
          price: "0.053210",
          marketCap: 28987654.32,
        },
        social: {
          discord: null,
          twitter: "https://twitter.com/faketok5",
          telegram: "https://t.me/faketok5",
          website: "https://faketok5.xyz",
        },
        poolsAggregation: {
          total: {
            liquidity: 2456789.12,
            volume: {
              hour: 198765.45,
              day: 8765432.1,
            },
            poolsLength: 140,
          },
        },
      },
      {
        score: {
          score: 91,
          details: {
            social: {
              sentiment: { ssePenalty: 0 },
              smartEngagement: { ssePenalty: 0 },
              mindshare: { ssePenalty: 0 },
            },
            dailyVolumePercentage: 14,
            liquidityPercentage: 8.3,
            top10HolderPercentage: 0.128,
            mintAuthority: "ma:undefined",
            freezeAuthority: "fa:undefined",
            creationDatePenalty: 2,
          },
        },
        meta: {
          name: "FAKEF",
          symbol: "FAKEF",
          address: "F1G2H3I4J5K6LMNOPQRSTUVWX",
          image: "https://fakeimages.com/token6.png",
          creationDate: "2024-07-25T17:45:00.000Z",
        },
        financial: {
          supply: 432109876.54321,
          price: "0.049876",
          marketCap: 21567890.12,
        },
        social: {
          discord: null,
          twitter: "https://twitter.com/faketok6",
          telegram: "https://t.me/faketok6",
          website: "https://faketok6.xyz",
        },
        poolsAggregation: {
          total: {
            liquidity: 2345678.34,
            volume: {
              hour: 156789.12,
              day: 7896543.21,
            },
            poolsLength: 130,
          },
        },
      },
      {
        score: {
          score: 87,
          details: {
            social: {
              sentiment: { ssePenalty: 0 },
              smartEngagement: { ssePenalty: 0 },
              mindshare: { ssePenalty: 0 },
            },
            dailyVolumePercentage: 11,
            liquidityPercentage: 5.8,
            top10HolderPercentage: 0.105,
            mintAuthority: "ma:undefined",
            freezeAuthority: "fa:undefined",
            creationDatePenalty: 4,
          },
        },
        meta: {
          name: "FAKEG",
          symbol: "FAKEG",
          address: "G1H2I3J4K5LMNOPQRSTUVWX",
          image: "https://fakeimages.com/token7.png",
          creationDate: "2024-08-10T08:22:34.000Z",
        },
        financial: {
          supply: 321098765.432109,
          price: "0.039876",
          marketCap: 18976543.21,
        },
        social: {
          discord: null,
          twitter: "https://twitter.com/faketok7",
          telegram: "https://t.me/faketok7",
          website: "https://faketok7.xyz",
        },
        poolsAggregation: {
          total: {
            liquidity: 1567890.23,
            volume: {
              hour: 112345.67,
              day: 6543210.98,
            },
            poolsLength: 120,
          },
        },
      },
      {
        score: {
          score: 93,
          details: {
            social: {
              sentiment: { ssePenalty: 0 },
              smartEngagement: { ssePenalty: 0 },
              mindshare: { ssePenalty: 0 },
            },
            dailyVolumePercentage: 17,
            liquidityPercentage: 9.0,
            top10HolderPercentage: 0.13,
            mintAuthority: "ma:undefined",
            freezeAuthority: "fa:undefined",
            creationDatePenalty: 1,
          },
        },
        meta: {
          name: "FAKEH",
          symbol: "FAKEH",
          address: "H1I2J3K4LMNOPQRSTUVWX",
          image: "https://fakeimages.com/token8.png",
          creationDate: "2024-06-30T11:22:00.000Z",
        },
        financial: {
          supply: 210987654.321098,
          price: "0.059876",
          marketCap: 12987654.32,
        },
        social: {
          discord: null,
          twitter: "https://twitter.com/faketok8",
          telegram: "https://t.me/faketok8",
          website: "https://faketok8.xyz",
        },
        poolsAggregation: {
          total: {
            liquidity: 1896543.21,
            volume: {
              hour: 156789.12,
              day: 7896543.21,
            },
            poolsLength: 150,
          },
        },
      },
      {
        score: {
          score: 86,
          details: {
            social: {
              sentiment: { ssePenalty: 0 },
              smartEngagement: { ssePenalty: 0 },
              mindshare: { ssePenalty: 0 },
            },
            dailyVolumePercentage: 12,
            liquidityPercentage: 7.1,
            top10HolderPercentage: 0.11,
            mintAuthority: "ma:undefined",
            freezeAuthority: "fa:undefined",
            creationDatePenalty: 2,
          },
        },
        meta: {
          name: "FAKEI",
          symbol: "FAKEI",
          address: "I1J2K3LMNOPQRSTUVWX",
          image: "https://fakeimages.com/token9.png",
          creationDate: "2024-09-05T15:34:22.000Z",
        },
        financial: {
          supply: 198765432.109876,
          price: "0.029876",
          marketCap: 9876543.21,
        },
        social: {
          discord: null,
          twitter: "https://twitter.com/faketok9",
          telegram: "https://t.me/faketok9",
          website: "https://faketok9.xyz",
        },
        poolsAggregation: {
          total: {
            liquidity: 1432109.87,
            volume: {
              hour: 109876.54,
              day: 5678901.23,
            },
            poolsLength: 110,
          },
        },
      },
      {
        score: {
          score: 85,
          details: {
            social: {
              sentiment: { ssePenalty: 0 },
              smartEngagement: { ssePenalty: 0 },
              mindshare: { ssePenalty: 0 },
            },
            dailyVolumePercentage: 10,
            liquidityPercentage: 6.5,
            top10HolderPercentage: 0.109,
            mintAuthority: "ma:undefined",
            freezeAuthority: "fa:undefined",
            creationDatePenalty: 3,
          },
        },
        meta: {
          name: "FAKEJ",
          symbol: "FAKEJ",
          address: "J1K2LMNOPQRSTUVWX",
          image: "https://fakeimages.com/token10.png",
          creationDate: "2024-08-20T13:12:45.000Z",
        },
        financial: {
          supply: 98765432.109876,
          price: "0.019876",
          marketCap: 7654321.09,
        },
        social: {
          discord: null,
          twitter: "https://twitter.com/faketok10",
          telegram: "https://t.me/faketok10",
          website: "https://faketok10.xyz",
        },
        poolsAggregation: {
          total: {
            liquidity: 1234567.89,
            volume: {
              hour: 98765.43,
              day: 4321098.76,
            },
            poolsLength: 100,
          },
        },
      },
    ];

    const tokens = [data, ...fakeTokens].map((token) => new Token(token));

    return tokens.map((token) => token.toObject() as TokenInterface);
  } catch (e) {
    console.error(e);
  }
  return [];
});
