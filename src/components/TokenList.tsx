import clsx from "clsx";

import { useIsLoading, useSelectedToken, useTokens } from "~/hooks/tokens";
import AuthLayout from "~/layout/AuthLayout";
import { AppLayout } from "~/utils/styled";
import Header from "./Header";
import TokenCard from "./token-card/Card";
import Up from "/up.png";
import Down from "/down.png";
import { useEffect, useRef, useState } from "react";
import { useMemo } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper/modules";
import { next, prev } from "~/services/tokens";
import Buy from "./token-card/Buy";
import {
    useWeb3ModalAccount,
    useWeb3ModalProvider,
} from "@web3modal/solana/react";

import solona from "@/assets/solana.png";
const TokenListContent = () => {
    const tokens = useTokens();

    const selectedToken = useSelectedToken();
    const swiperRef = useRef<SwiperClass>(null);

    const [isAnimating, setIsAnimating] = useState(false);
    const [isInit, setIsInit] = useState(false);

    const { isConnected } = useWeb3ModalAccount();
    const { connection, walletProvider } = useWeb3ModalProvider();

    const [balance, setBalance] = useState(0);

    const initialIndex = useMemo(() => {
        if (selectedToken.index < 2) return selectedToken.index;
        return 2;
    }, [selectedToken.index]);

    const handlePrevClick = () => {
        if (swiperRef.current && !isAnimating) {
            setIsAnimating(true);
            swiperRef.current.slidePrev();
            setTimeout(() => {
                setIsAnimating(false);
            }, 600);
        }
    };

    const handleNextClick = () => {
        if (swiperRef.current && !isAnimating) {
            setIsAnimating(true);
            swiperRef.current.slideNext();
            setTimeout(() => {
                setIsAnimating(false);
            }, 600);
        }
    };

    const [spaceBetween, setSpaceBetween] = useState(30); // Default space
    const [slidePerView, setSlidePerView] = useState(1.25); // Default slide per view


    useEffect(() => {
        swiperRef?.current?.update();
    },[spaceBetween,slidePerView])

    const adjustSwiperSettings = () => {
        setSpaceBetween(calcSpace())
        setSlidePerView(calcSlides())
    };

    useEffect(() => {
        adjustSwiperSettings(); // Adjust on component mount
        window.addEventListener("resize", (adjustSwiperSettings));
        return () => window.removeEventListener("resize", adjustSwiperSettings);
    }, []);

    const visibleTokens = useMemo(() => {
        return tokens.filter((token) => {
            const isPrev =
                token.index < selectedToken.index &&
                token.index >= selectedToken.index - 2;

            const isNext =
                token.index > selectedToken.index &&
                token.index <= selectedToken.index + 2;
            const isCurrent = selectedToken.index === token.index;
            return isCurrent || isNext || isPrev;
        });
    }, [selectedToken.index, tokens]);
    useEffect(() => {
        if (!isConnected) return;
        connection.getBalance(walletProvider.publicKey).then((balance) => {
            setBalance(balance / 10e9);
        });
    }, [walletProvider, connection, isConnected]);


    const calcSlides = () => {
        if(window.innerHeight >= 800)
            return 1.25

        if( window.innerHeight >= 720)
            return 1.25;
        if(window.innerHeight >= 678)
            return 1.22
        if(window.innerHeight >= 645)
            return 1.15
        return 1;
    }

    const calcSpace = () => {
        if( window.innerHeight >= 800)
            return 10
        if( window.innerHeight >= 720)
            return 5;
        if(window.innerHeight >= 645)
            return 5
        return 0
    }

    return (
        <AppLayout>
            <AuthLayout>
                <div className="wrapperScreen mb-8 md:p-8">
                    <Header />
                    <Swiper
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                            setIsInit(true);
                        }}
                        modules={[Keyboard]}
                        direction="vertical"
                        className="swipToken"
                        initialSlide={initialIndex}
                        keyboard={{
                            enabled: true,
                            onlyInViewport: false,
                        }}
                        breakpoints={{
                            1650: {
                                slidesPerView: 1.2,
                                spaceBetween: 30,
                            },
                            1200: {
                                slidesPerView: 1.15,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 1.2,
                                spaceBetween: 10,
                            },
                            500: {
                                slidesPerView: 1.3,
                                spaceBetween: 20,
                            },

                        }}
                        speed={500}
                        effect="slide"
                        slidesPerView={slidePerView}
                        centeredSlides={true}
                        spaceBetween={spaceBetween}
                        onSlidePrevTransitionEnd={() => {
                            if (!isInit) return;
                            prev();

                            if (selectedToken.index > 2) {
                                swiperRef.current.activeIndex = 2;
                            }
                        }}
                        onSlideNextTransitionEnd={() => {
                            if (!isInit) return;
                            next();
                            if (selectedToken.index >= 2)
                                swiperRef.current.activeIndex = 2;
                        }}>
                        {visibleTokens.map((token, _index) => {
                            const isPrev =
                                token.index < selectedToken.index &&
                                token.index >= selectedToken.index - 2;

                            const isNext =
                                token.index > selectedToken.index &&
                                token.index <= selectedToken.index + 2;
                            const isCurrent =
                                selectedToken.index === token.index;
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
                                        )}>
                                        <TokenCard token={token} />
                                    </SwiperSlide>
                                    {_index === tokens.length - 1 && (
                                        <SwiperSlide
                                            key={tokens[0].id}
                                            data-id={tokens[0].id}
                                            data-symbol={tokens[0].info.symbol}
                                            className={clsx(
                                                `token-${tokens[0].index}`,
                                                {
                                                    selected: false,
                                                    prev: false,
                                                    next: true,
                                                }
                                            )}>
                                            <TokenCard token={tokens[0]} />
                                        </SwiperSlide>
                                    )}
                                </>
                            );
                        })}
                    </Swiper>
                    <Buy />
                    <div className="balanceWrap flex mt-4 w-full justify-end items-center">
                        <span className="mr-4 balance">Balance :</span>
                        <img className="solonaLogo" src={solona} alt="solana" />
                        <span className="ml-2">
                            {Math.round(balance * 10000) / 1000}
                        </span>
                    </div>
                    <div
                        onClick={handlePrevClick}
                        className="nav-swiper swiper-button-prev hidden md:flex">
                        <img src={Up} alt="up" />
                    </div>
                    <div
                        onClick={handleNextClick}
                        className="nav-swiper swiper-button-next hidden md:flex">
                        <img src={Down} alt="down" />
                    </div>
                </div>
            </AuthLayout>
        </AppLayout>
    );
};

const TokenList = () => {
    const isLoading = useIsLoading();
    if (isLoading) return;
    return <TokenListContent />;
};

export default TokenList;
