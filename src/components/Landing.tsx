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
                    <div className="content justify-center flex flex-col wrapper">
                        <h1 className="slogan text-2xl text-center font-bold py-16 w-full text-white">
                            Study.Swipe.
                            <span className="relative text-[#68B790]">
                                Score!
                                <img
                                    src={line}
                                    className="absolute right-0 top-0 translate-y-3"
                                />
                            </span>
                        </h1>
                        <div className="landingLogoConnect">
                            <Logo />
                            <div className="emphaz">
                                Connect to app.
                                <div className="descLanding">Earn rewards.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-full absolute left-0 bottom-0 p-3">
                    <LandingButton
                        onClick={() => {
                            dispatch(setShowLanding(false));
                        }}>
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
    background: #030303;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
`;
export const StyledLanding = styled.div`
    flex: 1;
    height: 100%;
    // background: linear-gradient(#03112c 50%, #2be1c6);
`;

const LandingButton = styled.div`
    width: 100%;
    padding: 10px 25px;
    background: linear-gradient(145deg, #6fc49a, #5ea582);
    cursor: pointer;
    &:hover {
        background: #68b790;
        box-shadow: inset 50px 50px 100px #45795f,
            inset -50px -50px 100px #8bf5c1;
    }
`;
