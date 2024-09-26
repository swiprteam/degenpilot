import styled from "styled-components";
import { useState } from "react";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import { TokenInterface } from "~/types/interfaces";
import Header from "./Header";
import Score from "./Score";
import Swap from "./Swap";
import { swapLeft, swapRight } from "~/services/tokens";

type Props = {
  token: TokenInterface;
};

const TokenCard = ({ token }: Props) => {
  const [gone, setGone] = useState(false); // To prevent the token from returning after a swipe

  const [{ x }, api] = useSpring(() => ({
    x: 0, // Initial position at 0
  }));

  const bind = useDrag(
    ({ down, movement: [mx], velocity, direction: [xDir], cancel }) => {
      // If a more vertical than horizontal scroll is detected, cancel the drag
      if (Math.abs(xDir) < 0.2 && Math.abs(mx) < 100) {
        cancel();
      }

      // If we "swiped" with high velocity and are no longer dragging
      if (!down && velocity > 0.5) {
        // Trigger a specific event if the movement is to the right
        if (mx > 0) {
          swapRight(token);
        } else {
          swapLeft(token);
        }

        // After a swipe, ensure the card disappears
        setGone(true);
        api.start({ x: mx > 0 ? 1000 : -1000 }); // To the right or left
      } else {
        // If we haven't swiped yet, follow the movement
        api.start({ x: down ? mx : 0 });
      }
    },
    { axis: "x", filterTaps: true, threshold: 10 } // Limit swipe only to the horizontal axis, with a threshold to prevent intercepting light taps
  );

  return (
    <animated.div
      {...bind()}
      style={{
        x, // Use the animated position
        display: gone ? "none" : "block", // Hide the card after swipe
      }}
    >
      <StyledTokenCard className="mt-4 flex flex-col overflow-hidden">
        <Header token={token} />
        <Score token={token} />
        <Swap token={token} />
      </StyledTokenCard>
    </animated.div>
  );
};

const StyledTokenCard = styled.div`
  background: #0c284a;
  touch-action: pan-y; /* Allows vertical scrolling */
`;

export default TokenCard;
