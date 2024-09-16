import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import content from "../data/content.json";
import { chainImages } from "./mappings";
import { FEATURED_WALLETS } from "./web3-constants";
import { Chain } from "~/model/chain";
import { createWeb3Modal, defaultSolanaConfig } from "@web3modal/solana/react";
import { solana } from "@web3modal/solana/chains";

/*
const WAGMI_PROJECT_ID = "2f8447f1a50a7344246690dabdbfedd1";

interface Web3ModalConfig {
  web3Modal: ReturnType<typeof createWeb3Modal>;
  config: any;
}
export const setupWeb3modal = (chains: ): Web3ModalConfig => {
  const wagmiConfig = defaultSolanaConfig({
    projectId: WAGMI_PROJECT_ID,
    metadata: {
      name: "degenpilot",
      description: "AppKit Example",
      url: "https://web3modal.com",
      icons: ["https://avatars.githubusercontent.com/u/37784886"],
    },
    chains: [solana],
  });

  const web3Modal = createWeb3Modal({
    wagmiConfig,
    chainImages,
    projectId: WAGMI_PROJECT_ID,
    featuredWalletIds: Object.values(FEATURED_WALLETS),
    themeMode: "dark",
    themeVariables: {
      "--w3m-border-radius-master": "2px",
      "--w3m-font-family": "Inter",
      "--w3m-accent": "var(--primary)",
      "--w3m-color-mix": "#C1C1C1",
    },
  });

  return { web3Modal, config: wagmiConfig };
};

*/
