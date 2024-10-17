import { useState } from "react";
import styled from "styled-components";
import { Box } from "~/utils/styled";
import CircularGauge from "../CircularJauge";
import { TokenInterface } from "~/types/interfaces";
import Detail from "./Detail";
import Header from "./Header";
import { useSelectedToken } from "~/hooks/tokens";
import Canon from "/canon.png";

// Styled components with Tailwind classes
const FlipperContainer = styled.div`
    perspective: 1000px;
    position: relative;
    width: 100%;
    height: 100%;
`;

const Flipper = styled.div<{ isFlipped: boolean }>`
    transition: transform 0.6s;
    transform-style: preserve-3d;
    transform: ${(props) =>
        props.isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"};
    position: relative;
    width: 100%;
    height: 400px;
`;

const FrontFace = styled(Box)`
    z-index: 1;
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const BackFace = styled(Box)`
    backface-visibility: hidden;
    transform: rotateY(180deg);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Score = ({ token }: { token: TokenInterface }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const selectedToken = useSelectedToken();
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <>
            <FlipperContainer className="">
                <div className={`tagNew ${isFlipped ? "invisible" : ""}`}>
                    New
                </div>
                <Flipper className="mobileFlip" isFlipped={isFlipped}>
                    <FrontFace bordered>
                        <CircularGauge
                            score={token.score.value}
                            animate={token.id === selectedToken.id}
                        />
                        <Header token={token} />
                    </FrontFace>
                    <BackFace className="back" bordered>
                        <Detail token={token} />
                    </BackFace>
                </Flipper>
            </FlipperContainer>
            <div className="relative buttonsToken">
                <a
                    className={` ${
                        isFlipped ? "hidden" : ""
                    } infoButton left absolute right-0 m-2 flex`}
                    href={`https://dexscreener.com/solana/${token.info.address}`}
                    target="_blank">
                    <img src={Canon} alt="" />{" "}
                </a>

                <InfoButton
                    className="absolute right-0 top-0 m-2"
                    onClick={handleFlip}>
                    {isFlipped ? <span>X</span> : <span>i</span>}
                </InfoButton>
            </div>
        </>
    );
};

const InfoButton = styled.button`
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    padding: 5px;
    display: block;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    background: #252525;
    z-index: 2;
    background: linear-gradient(145deg, #474747, #3b3b3b);
    border: none;
    position: absolute;
    top: -20px;
    right: -10px;
    transition: all 0.3s ease;
    @media all and (max-width: 1024px) {
        top: -50px;
    }
    &:hover {
        background: linear-gradient(145deg, #3b3b3b, #474747);
        > * {
            color: #528e70;
        }
    }
    &:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        top: 0;
        left: 0;
        border-left: 0.1px solid #666;
        transform: rotate(45deg);
    }
    > * {
        transition: all 0.3s ease;
        color: #68b790;
        font-family: "Fira Code", sans-serif;
        font-size: 22px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        display: block;
    }

    &:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        top: 0;
        left: 0;
        border-left: 0.1px solid #666;
        transform: rotate(45deg);
    }
    > * {
        color: #68b790;
        font-family: "Fira Code", sans-serif;
        font-size: 22px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        display: block;
    }
`;

export default Score;
