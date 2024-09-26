import clsx from "clsx";
import { useSwappableTokens } from "~/hooks/tokens";

import Header from "./Header";
import { AppLayout } from "~/utils/styled";
import AuthLayout from "~/layout/AuthLayout";
import TokenCard from "./token-card/Card";

const TokenList = () => {
  const tokens = useSwappableTokens();

  return (
    <AppLayout>
      <div className="mb-8">
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
                </div>
              );
            })}
          </ul>
        </AuthLayout>
      </div>
    </AppLayout>
  );
};

export default TokenList;
