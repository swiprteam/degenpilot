import styled from "styled-components";
import { TokenInterface } from "~/types/interfaces";
import Score from "./Score";
// import Swap from "./Swap";
import Buy from "./Buy";

type Props = {
    token: TokenInterface;
};

const TokenCard = ({ token }: Props) => {
    return (
        <>
            <StyledTokenCard className="flex flex-col overflow-hidden">
                <Score token={token} />
            </StyledTokenCard>
        </>
    );
};

const StyledTokenCard = styled.div`
    touch-action: pan-y; /* Allows vertical scrolling */
    background: #131315;
    border-radius: 20px;
    padding: 10px 20px;
    max-height: 461px;
    @media all and (max-width: 1024px) {
        max-height: 425px;
    }
    @media all and (max-width: 375px) and (min-height: 600px) {
        max-height: 380px;
    }
`;

export default TokenCard;
