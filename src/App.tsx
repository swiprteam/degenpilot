import { useWeb3ModalAccount } from "@web3modal/solana/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import "./App.css";
import TokenCard from "./components/TokenCard";
import { useSwappableTokens } from "./hooks/tokens";
import { dispatch } from "./store";
import { setConnectedAddress } from "./store/web3";
import { swapLeft, swapRight } from "./services/tokens";

function App() {
  const [count, setCount] = useState(0);

  const { address, isConnected } = useWeb3ModalAccount();

  useEffect(() => {
    if (isConnected && address) dispatch(setConnectedAddress(address));
    else dispatch(setConnectedAddress(null));
  }, [address, isConnected]);

  const tokens = useSwappableTokens();

  return (
    <>
      <ul>
        {tokens.length === 0 && <div>No tokens to see</div>}
        {tokens.map((token, _index) => {
          return (
            <div
              key={token._id}
              className={clsx({
                hidden: _index !== 0,
              })}
            >
              <TokenCard token={token} />
              <button onClick={() => swapLeft()}>Cancel</button>
              <button
                onClick={() => {
                  swapRight();
                }}
              >
                Buy
              </button>
            </div>
          );
        })}
      </ul>
    </>
  );
}

export default App;
