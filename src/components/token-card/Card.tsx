import { TokenInterface } from "~/types/interfaces";
import TokenImage from "../TokenImage";
import { Box } from "~/utils/styled";
import styled from "styled-components";
import solana from "@/assets/solana.png";
import Share from "@/svg/share.svg?react";
import Header from "./Header";
import Score from "./Score";
type Props = {
  token: TokenInterface;
};
const TokenCard = ({ token }: Props) => {
  console.log("🚀 ~ TokenCard ~ token:", token);
  return (
    <StyledTokenCard className="mt-4 flex flex-col">
      <Header token={token} />
      <Score token={token} />
    </StyledTokenCard>
  );
};

const StyledTokenCard = styled.div`
  background: #0c284a;
`;
export default TokenCard;
