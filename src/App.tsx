import { useWeb3ModalAccount } from "@web3modal/solana/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import "./App.css";
import TokenCard from "./components/TokenCard";
import { useSelectedToken, useTokens } from "./hooks/tokens";
import { dispatch } from "./store";
import { setConnectedAddress } from "./store/web3";

import { selectNext } from "./services/tokens";
function App() {
  const [count, setCount] = useState(0);

  const { address, isConnected } = useWeb3ModalAccount();

  useEffect(() => {
    if (isConnected && address) dispatch(setConnectedAddress(address));
    else dispatch(setConnectedAddress(null));
  }, [address, isConnected]);

  const tokens = useTokens();
  const selectedToken = useSelectedToken();

  return (
    <>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>

      <ul>
        {tokens.map((token) => (
          <div
            key={token.id}
            className={clsx({
              hidden: token.id !== selectedToken.id,
            })}
          >
            <TokenCard token={token} />
            <button>Cancel</button>
            <button
              onClick={() => {
                selectNext();
              }}
            >
              Buy
            </button>
          </div>
        ))}
      </ul>
    </>
  );
}

export default App;
