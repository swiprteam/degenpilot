import styled from "styled-components";
import line from "@/assets/line.png";
import Logo from "./Logo";
import { dispatch } from "~/store";
import { setLandingLanding } from "~/store/app";
import { FaArrowRight } from "react-icons/fa";
const Landing = () => {
  return (
    <StyledLanding>
      <div className="flex flex-col">
        <div className="content justify-center flex flex-col">
          <h1 className="text-2xl text-center py-16 w-full">
            Study.Swipe.
            <span className="relative">
              Score!
              <img
                src={line}
                className="absolute right-0 top-0 translate-y-3"
              />
            </span>
          </h1>

          <div className="flex justify-center w-full">
            <Logo />
          </div>
        </div>
      </div>
      <div className="flex w-full absolute left-0 bottom-0 p-3">
        <LandingButton
          onClick={() => {
            dispatch(setLandingLanding(false));
          }}
        >
          <span className="flex justify-center">
            Start swapping
            <FaArrowRight className="ml-2 mt-1" />
          </span>
        </LandingButton>
      </div>
    </StyledLanding>
  );
};
export default Landing;

export const StyledLanding = styled.div`
  height: 100vh;
  width: 100%;
  background: linear-gradient(#03112c 50%, #2be1c6);
`;

const LandingButton = styled.div`
  width: 100%;

  border-radius: 10px;
  border: 1.471px solid #224373;
  padding: 10px 25px;

  background: linear-gradient(
    0deg,
    rgba(25, 135, 131, 0.64) 0%,
    rgba(0, 0, 0, 0.64) 100%
  );
`;
