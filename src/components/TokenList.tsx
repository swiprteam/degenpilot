import clsx from "clsx";

import Header from "./Header";
import { AppLayout } from "~/utils/styled";
import AuthLayout from "~/layout/AuthLayout";
import TokenCard from "./token-card/Card";
import { useTokens } from "~/hooks/tokens";
import { getSelectedToken } from "~/services/tokens";

const TokenList = () => {
    const tokens = useTokens();
    const useSelectedToken = getSelectedToken();
    return (
        <AppLayout>
            <AuthLayout>
                <div className="mb-8 md:bg-secondary md:p-8">
                    <Header />
                    <ul>
                        {tokens.length === 0 && <div>No tokens to see</div>}
                        {tokens.map((token) => {
                            const selectedToken = getSelectedToken();

                            const isNext =
                                selectedToken.index === token.index - 1;
                            const isPrev =
                                selectedToken.index === token.index + 1;
                            const isCurrent =
                                selectedToken.index === token.index;
                            if (!isCurrent && !isNext && !isPrev) return null;
                            return (
                                <div
                                    key={token.id}
                                    className={clsx(`token-${token.index}`, {
                                        selected: selectedToken.id === token.id,
                                        prev: isPrev,
                                        next: isNext,
                                        hidden: !isCurrent,
                                    })}>
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
