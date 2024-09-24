import { useWeb3ModalAccount } from "@web3modal/solana/react";
import { useEffect } from "react";
import "./App.css";
import Landing from "./components/Landing";
import TokenList from "./components/TokenList";
import { useIsInit, useShowLanding } from "./hooks/app";
import { dispatch } from "./store";
import { setConnectedAddress } from "./store/web3";

function App() {
  const { address, isConnected } = useWeb3ModalAccount();

  useEffect(() => {
    if (isConnected && address) dispatch(setConnectedAddress(address));
    else dispatch(setConnectedAddress(null));
  }, [address, isConnected]);
  const isInit = useIsInit();
  const showLanding = useShowLanding();
  if (!isInit) return null;
  if (showLanding) return <Landing />;

  return <TokenList />;
}

export default App;
