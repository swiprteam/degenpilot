import styled from "styled-components";
import line from "@/assets/line.png";
import Logo from "./Logo";
import { dispatch } from "~/store";
import { setShowLanding } from "~/store/app";
import { FaArrowRight } from "react-icons/fa";

const Landing = () => {
  return (
    <Layout>
      <StyledLanding>
        <div className="flex flex-col">
          <div className="content justify-center flex flex-col">
            <h1 className="text-2xl text-center font-bold py-16 w-full text-white">
              Study.Swipe.
              <span className="relative text-[#68B790]">
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
              dispatch(setShowLanding(false));
            }}
          >
            <span className="flex justify-center text-white">
              Start swapping
              <FaArrowRight className="ml-2 mt-1" />
            </span>
          </LandingButton>
        </div>
      </StyledLanding>
    </Layout>
  );
};
export default Landing;

export const Layout = styled.div`
  background: #03112c;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
`;
export const StyledLanding = styled.div`
  flex: 1;
  height: 100%;
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
