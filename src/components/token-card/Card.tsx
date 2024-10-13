import styled from "styled-components";

import { TokenInterface } from "~/types/interfaces";
import Score from "./Score";
import Swap from "./Swap";
import Buy from "./Buy";

type Props = {
    token: TokenInterface;
};

const TokenCard = ({ token }: Props) => {
    return (
        <>
            <StyledTokenCard className="mt-4 flex flex-col overflow-hidden">
                <Score token={token} />
                {/* <Swap token={token} /> */}
            </StyledTokenCard>
            <Buy token={token} />
        </>
    );
};

const StyledTokenCard = styled.div`
    touch-action: pan-y; /* Allows vertical scrolling */
    background: #282828;
    border-radius: 20px;
    padding: 20px;
`;

export default TokenCard;
