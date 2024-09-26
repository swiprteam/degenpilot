import { useState } from "react";
import styled from "styled-components";
import { Box, Button } from "~/utils/styled";
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

  return (
    <FlipperContainer className="mt-8">
      <Flipper isFlipped={isFlipped}>
        {/* Front side */}
        <FrontFace bordered>
          <Button
            className="absolute right-0 top-0 m-2 bg-blue-500 text-white z-20"
            onClick={handleFlip}
          >
            +info
          </Button>
          <CircularGauge score={token.score.value} />
        </FrontFace>

        {/* Back side */}
        <BackFace bordered>
          <Button
            className="absolute right-0 top-0 m-2 bg-red-500 text-white"
            onClick={handleFlip}
          >
            Retour
          </Button>
          <Detail />
        </BackFace>
      </Flipper>
    </FlipperContainer>
  );
};

export default Score;
