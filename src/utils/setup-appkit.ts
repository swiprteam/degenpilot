import { SolanaAdapter } from "@reown/appkit-adapter-solana/react";
import { AppKit, createAppKit } from "@reown/appkit/react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { ChainInterface } from "~/types/interfaces";

const WEB3MODAL_PROJECT_ID = "6bd557ccd0ae9facc6106e6a7ff75f57";

export const setupAppkit = (chains: ChainInterface[]): AppKit => {
  const projectId = WEB3MODAL_PROJECT_ID;

  const solanaWeb3JsAdapter = new SolanaAdapter({
    wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
  });

  const metadata = {
    name: "AppKit",
    description: "AppKit Solana Example",
    url: "https://web3modal.com", // origin must match your domain & subdomain
    icons: ["https://avatars.githubusercontent.com/u/179229932"],
  };

  console.log("eapp-kt");
  const appKit = createAppKit({
    adapters: [solanaWeb3JsAdapter],
    networks: chains,
    projectId,
    metadata,
    features: {
      analytics: true, // Optional - defaults to your Cloud configuration
    },
  });

  return appKit;
};
