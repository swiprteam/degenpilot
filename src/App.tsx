import { useWeb3ModalAccount } from "@web3modal/solana/react";
import { useEffect } from "react";
import "./App.css";
import TokenList from "./components/TokenList";
import { useIsInit, useShowVideo } from "./hooks/app";
import { dispatch } from "./store";
import { setConnectedAddress } from "./store/web3";
import buyVideo from "@/assets/buy.mp4";
import { setShowVideo } from "./store/app";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "swiper/css";

function App() {
    // console.log

    const { address, isConnected } = useWeb3ModalAccount();

    useEffect(() => {
        if (isConnected && address) dispatch(setConnectedAddress(address));
        else dispatch(setConnectedAddress(null));
    }, [address, isConnected]);
    const isInit = useIsInit();

    const showVideo = useShowVideo();
    if (!isInit) return null;

    return (
        <>
            {showVideo && (
                <video
                    onEnded={() =>
                        setTimeout(() => dispatch(setShowVideo(false)), 1000)
                    }
                    autoPlay
                    className="fixed centerXY z-50 object-contain w-80">
                    <source src={buyVideo} type="video/mp4" />
                </video>
            )}
            <div className="flex max-h-screen">
                <div className="w-full backGroundGeneral justify-center items-center flex">
                    <div className="max-w-md">
                        <TokenList />
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default App;
