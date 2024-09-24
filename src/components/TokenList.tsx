import clsx from "clsx";
import { useSwappableTokens } from "~/hooks/tokens";

import Header from "./Header";
import { AppLayout } from "~/utils/styled";
import AuthLayout from "~/layout/AuthLayout";
import { swapLeft, swapRight } from "~/services/tokens";
import TokenCard from "./token-card/card";

const TokenList = () => {
  const tokens = useSwappableTokens();

  return (
    <AppLayout>
      <AuthLayout>
        <Header />
        <ul>
          {tokens.length === 0 && <div>No tokens to see</div>}
          {tokens.map((token, _index) => {
            return (
              <div
                key={token.id}
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
    </AppLayout>
  );
};

export default TokenList;
