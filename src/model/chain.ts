import { ChainInterface } from "~/types/interfaces";
import { Serializable } from "./serializable";

export class Chain extends Serializable<ChainInterface> implements Chain {
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

  static byChainId: { [chainId: number | string]: Chain } = {};

  constructor(chain: ChainInterface) {
    super();
    this.id = chain.id;
    this.name = chain.name;
    this.rpcUrls = chain.rpcUrls;
    this.nativeCurrency = chain.nativeCurrency;
    this.blockExplorers = chain.blockExplorers;
    this.contracts = chain.contracts;

    Chain.byChainId[this.id] = this;
  }
}
