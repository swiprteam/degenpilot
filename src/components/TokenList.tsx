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
      <AuthLayout>
        <div className="mb-8 md:bg-secondary md:p-8">
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
        </div>
      </AuthLayout>
    </AppLayout>
  );
};

export default TokenList;
