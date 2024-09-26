import { useWeb3ModalAccount } from "@web3modal/solana/react";
import { useEffect, useRef } from "react";
import "./App.css";
import Landing from "./components/Landing";
import TokenList from "./components/TokenList";
import { useIsInit, useShowLanding, useShowVideo } from "./hooks/app";
import { dispatch } from "./store";
import { setConnectedAddress } from "./store/web3";
import buyVideo from "@/assets/buy.mp4";
import { setShowVideo } from "./store/app";
function App() {
  const { address, isConnected } = useWeb3ModalAccount();

  useEffect(() => {
    if (isConnected && address) dispatch(setConnectedAddress(address));
    else dispatch(setConnectedAddress(null));
  }, [address, isConnected]);
  const isInit = useIsInit();
  const showLanding = useShowLanding();
  const showVideo = useShowVideo();
  if (!isInit) return null;
  if (showLanding) return <Landing />;

  return (
    <>
      {showVideo && (
        <video
          onEnded={() => setTimeout(() => dispatch(setShowVideo(false)), 1000)}
          autoPlay
          className="fixed centerXY z-50 object-contain w-80"
        >
          <source src={buyVideo} type="video/mp4" />
        </video>
      )}
      <TokenList />
    </>
  );
}

export default App;
