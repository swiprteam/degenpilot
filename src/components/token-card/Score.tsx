import { useState } from "react";
import styled from "styled-components";
import { Box } from "~/utils/styled";
import CircularGauge from "../CircularJauge";
import { TokenInterface } from "~/types/interfaces";
import Detail from "./Detail";

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
  height: 360px;
`;

const FrontFace = styled(Box)`
  z-index: 1;
  background: #072045;
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

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  const score = token.score.value;

  return (
    <FlipperContainer className="mt-8">
      <Flipper isFlipped={isFlipped}>
        {/* Front side */}
        <FrontFace bordered>
          <InfoButton
            className="absolute right-0 top-0 m-2 bg-blue-500 text-white z-20"
            onClick={handleFlip}
          >
            <span>+INFO</span>
          </InfoButton>
          <CircularGauge score={score} />
        </FrontFace>

        {/* Back side */}
        <BackFace className="back" bordered>
          <InfoButton
            className="absolute right-0 top-0 m-2 bg-red-500 text-white"
            onClick={handleFlip}
          >
            <span>SCORE</span>
          </InfoButton>
          <Detail token={token} />
        </BackFace>
      </Flipper>
    </FlipperContainer>
  );
};

const InfoButton = styled.button`
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 7px;
  background-color: #0c2d5e;
  padding: 5px;
  display: block;
  > * {
    background: rgba(23, 61, 119, 0.7);
    border-radius: 7px;
    text-transform: uppercase;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    display: block;
    padding: 12px 10px;
  }
`;

export default Score;
