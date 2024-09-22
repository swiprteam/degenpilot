import { swapLeft, swapRight } from "~/store/tokens";
import TokenCard from "./TokenCard";
import clsx from "clsx";
import { useSwappableTokens } from "~/hooks/tokens";

import AuthLayout from "~/layout/AuthLayout";

const TokenList = () => {
  const tokens = useSwappableTokens();

  return (
    <AuthLayout>
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
    </AuthLayout>
  );
};

export default TokenList;
