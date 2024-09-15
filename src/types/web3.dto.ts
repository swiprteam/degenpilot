export type Chain = {
  id: number;
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
};
