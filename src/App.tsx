import { useWeb3ModalAccount } from "@web3modal/solana/react";
import { useEffect } from "react";
import "./App.css";
import Landing from "./components/Landing";
import TokenList from "./components/TokenList";
import { useIsInit, useShowLanding, useShowVideo } from "./hooks/app";
import { dispatch } from "./store";
import { setConnectedAddress } from "./store/web3";
import buyVideo from "@/assets/buy.mp4";
import { setShowVideo } from "./store/app";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

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
      <div className="flex max-h-screen overflow-y-hidden">
        <div className="w-full bg-darkBlue justify-center items-center flex">
          <div className="max-w-md">
            <TokenList />
          </div>
        </div>
        <div className="hidden w-128 md:flex bg-secondary">
          <div className="flex flex-col justify-center items-center w-full">
            <div className="bg-[#0D2B58] p-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="51"
                height="48"
                viewBox="0 0 51 48"
                fill="none"
              >
                <path
                  d="M48.878 0.991447C47.7361 0.0280066 46.1429 -0.254381 44.7316 0.237306L3.30469 14.8318C1.8361 15.35 0.788559 16.6191 0.559513 18.1374C0.333836 19.6589 0.970448 21.1705 2.22346 22.0842L7.07047 25.619L18.5665 17.0211C19.6848 16.1872 21.2679 16.4065 22.1066 17.5028C22.9487 18.5992 22.7331 20.1606 21.6182 20.9945L11.2876 28.7219V41.5457C11.2876 43.1171 12.1701 44.5323 13.5882 45.2466C14.1978 45.5522 14.8513 45.7017 15.5014 45.7017C16.3737 45.7017 17.2394 45.4326 17.9737 44.9044L20.4663 43.1137C21.5946 42.3031 21.8439 40.745 21.022 39.6321C20.2069 38.5224 18.6272 38.2666 17.492 39.0839L16.3367 39.9145V32.3797L36.2468 46.8944C36.9878 47.4326 37.8602 47.7084 38.7427 47.7084C39.2614 47.7084 39.7903 47.612 40.2955 47.416C41.6496 46.8878 42.6197 45.725 42.8891 44.3097L50.2859 4.91165C50.5655 3.43659 50.0401 1.96818 48.878 0.991447Z"
                  fill="#00A6DA"
                />
              </svg>
              <h2 className="text-3xl font-semibold mb-2">Feedback box</h2>
              <h3 className="text-primary text-2xl">
                What would you like to see here?
              </h3>
              <textarea
                placeholder="Type here"
                className="w-full mt-6 h-32 bg-[#03122E] rounded-[12px] p-4"
              />
              <div className="flex justify-end">
                <button className="bg-secondary text-center px-4 mt-2">
                  send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
