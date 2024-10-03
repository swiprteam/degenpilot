import styled from "styled-components";

import { TokenInterface } from "~/types/interfaces";
import Header from "./Header";
import Score from "./Score";
import Swap from "./Swap";

type Props = {
  token: TokenInterface;
};

const TokenCard = ({ token }: Props) => {
  return (
    <StyledTokenCard className="mt-4 flex flex-col overflow-hidden">
      <Header token={token} />
      <Score token={token} />
      <Swap token={token} />
    </StyledTokenCard>
  );
};

const StyledTokenCard = styled.div`
  touch-action: pan-y; /* Allows vertical scrolling */
`;

export default TokenCard;
