import {
  Agregation,
  Score,
  TokenFinancial,
  TokenMeta,
  TokenSocial,
} from "./types";

export interface ChainInterface {
  id: number | string;
  name: string;
  nativeCurrency: { name: string; symbol: string; decimals: number };
  rpcUrls: {
    default: {
      http: string[];
    };
  };
  blockExplorers: {
    default: {
      name: string;
      url: string;
      apiUrl: string;
    };
  };
  contracts?: {
    ensRegistry: {
      address: string;
    };
    ensUniversalResolver: {
      address: string;
      blockCreated: number;
    };
    multicall3: {
      address: string;
      blockCreated: number;
    };
  };
}

export interface TokenInterface {
  id: string;
  score: Score;
  meta: TokenMeta;
  financial: TokenFinancial;
  social: TokenSocial;
  poolsAggregation: Agregation;
}
