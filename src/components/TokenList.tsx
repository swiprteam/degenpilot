import clsx from "clsx";

import { useSelectedToken, useTokens } from "~/hooks/tokens";
import AuthLayout from "~/layout/AuthLayout";
import { AppLayout } from "~/utils/styled";
import Header from "./Header";
import TokenCard from "./token-card/Card";

import { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { next, prev } from "~/services/tokens";

const TokenList = () => {
  const tokens = useTokens();
  const selectedToken = useSelectedToken();

  const initialIndex = useMemo(() => {
    if (selectedToken.index < 1) return selectedToken.index;
    return 1;
  }, [selectedToken.index]);
  return (
    <AppLayout>
      <AuthLayout>
        <div className="mb-8 md:p-8">
          <Header />
          <Swiper
            key={selectedToken.index}
            direction="vertical"
            className="swipToken"
            initialSlide={initialIndex}
            // slidesPerView={1.2}
            // centeredSlides={true}
            // spaceBetween={100}
            onSlideChangeTransitionEnd={(e) => {
              if (e.swipeDirection === "prev") prev();
              else if (e.swipeDirection === "next") next();
            }}
          >
            {tokens.map((token, _index) => {
              const isPrev =
                token.index < selectedToken.index &&
                token.index >= selectedToken.index - 1;

              const isNext =
                token.index > selectedToken.index &&
                token.index <= selectedToken.index + 1;
              const isCurrent = selectedToken.index === token.index;
              if (!isCurrent && !isNext && !isPrev) return;

              return (
                <>
                  <SwiperSlide
                    key={token.id}
                    data-id={token.id}
                    className={clsx(
                      `token-${token.index} token-${token.info.symbol}`,
                      {
                        selected: isCurrent,
                        prev: isPrev,
                        next: isNext,
                      }
                    )}
                  >
                    <TokenCard token={token} />
                  </SwiperSlide>
                  {_index === tokens.length - 1 && (
                    <SwiperSlide
                      key={tokens[0].id}
                      data-id={tokens[0].id}
                      data-symbol={tokens[0].info.symbol}
                      className={clsx(`token-${tokens[0].index}`, {
                        selected: false,
                        prev: false,
                        next: true,
                      })}
                    >
                      <TokenCard token={tokens[0]} />
                    </SwiperSlide>
                  )}
                </>
              );
            })}
          </Swiper>
        </div>
      </AuthLayout>
    </AppLayout>
  );
};

export default TokenList;
