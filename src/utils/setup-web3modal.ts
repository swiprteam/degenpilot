import { createWeb3Modal, defaultSolanaConfig } from "@web3modal/solana/react";
import { ChainInterface } from "~/types/interfaces";
import { evmToSolanaChain } from "./chains";

const WEB3MODAL_PROJECTid = "9e836ab3f9a0ff2fc4411e331b3baba0";

export interface Web3ModalConfig {
  solana: {
    instance: ReturnType<typeof createWeb3Modal>;
    config: ReturnType<typeof defaultSolanaConfig>;
  };
}

export const setupWeb3modal = async (
  chains: ChainInterface[]
): Promise<Web3ModalConfig> => {
  const projectId = WEB3MODAL_PROJECTid;

  const solanaChain = chains.find(
    (n) => n.id === "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp"
  );
  if (!solanaChain) throw new Error("No Solana chain found");

  const solana = evmToSolanaChain(solanaChain);

  const solanaConfig = defaultSolanaConfig({
    projectId,
    metadata: {
      name: "degenpilot",
      description: "AppKit Example",
      url: "https://web3modal.com",
      icons: ["https://avatars.githubusercontent.com/u/37784886"],
    },
    auth: {
      email: false,
      socials: [],
    },
    chains: [solana],
  });

  const solanaWeb3Modal = createWeb3Modal({
    solanaConfig,
    chains: [solana],
    projectId,
    wallets: [
      // Solana wallet adapters (check Custom connectors for more info)
    ],
  });

  return {
    solana: {
      instance: solanaWeb3Modal,
      config: solanaConfig,
    },
  };
};
