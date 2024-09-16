import { ChainInterface } from "~/types/interfaces";

export const chains: ChainInterface[] = [
  {
    id: 1,
    name: "Ethereum",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: {
      default: {
        http: ["https://cloudflare-eth.com"],
      },
    },
    blockExplorers: {
      default: {
        name: "Etherscan",
        url: "https://etherscan.io",
        apiUrl: "https://api.etherscan.io/api",
      },
    },
    contracts: {
      ensRegistry: {
        address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
      },
      ensUniversalResolver: {
        address: "0x8cab227b1162f03b8338331adaad7aadc83b895e",
        blockCreated: 18_958_930,
      },
      multicall3: {
        address: "0xca11bde05977b3631167028862be2a173976ca11",
        blockCreated: 14_353_601,
      },
    },
  },
  {
    id: 900,
    name: "Solana",
    nativeCurrency: { name: "Sol", symbol: "SOL", decimals: 9 },
    rpcUrls: {
      default: {
        http: ["https://api.mainnet-beta.solana.com"],
      },
    },
    blockExplorers: {
      default: {
        name: "Solscan",
        url: "https://solscan.io",
        apiUrl: "https://api.solscan.io",
      },
    },
  },
];
