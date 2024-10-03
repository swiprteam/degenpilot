import { Chain } from "@web3modal/scaffold-utils/solana";
import { solana } from "@web3modal/solana/chains";
console.log("🚀 ~ solana:", solana);

import { ChainInterface } from "~/types/interfaces";

export const solanaToEVmChain = (chain: Chain) => {
  return {
    id: chain.chainId,
    name: chain.name,
    nativeCurrency: {
      name: chain.currency,
      symbol: chain.currency,
      decimals: 9,
    },
    rpcUrls: {
      default: {
        http: [chain.rpcUrl],
      },
    },
    blockExplorers: {
      default: {
        name: chain.name,
        url: chain.explorerUrl,
        apiUrl: chain.explorerUrl,
      },
    },
  };
};

export const evmToSolanaChain = (chain: ChainInterface) => {
  return {
    chainId: chain.id as string,
    name: chain.name,
    currency: chain.nativeCurrency.symbol,
    explorerUrl: chain.blockExplorers.default.url,
    rpcUrl: chain.rpcUrls.default.http[0],
    chain: "solana",
  };
};

export type SolanaChain = Chain;

export const chains: ChainInterface[] = [
  solanaToEVmChain({
    chainId: "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
    currency: "SOL",
    explorerUrl: "https://solscan.io",
    name: "Solana",
    rpcUrl:
      "https://mainnet.helius-rpc.com/?api-key=876dbf90-0423-4df6-8629-c231d78242c0",
  }),
];
