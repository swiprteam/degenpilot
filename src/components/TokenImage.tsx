import { TokenInterface } from "~/types/interfaces";
import { Square } from "~/utils/styled";
import styled from "styled-components";
const TokenImage = ({ token }: { token: TokenInterface }) => {
  return (
    <Frame className="overflow-hidden">
      <Square className="block relative w-16 sm:w-20">
        <Image src={token.info.imageUrl} alt={token.info.name} />
      </Square>
    </Frame>
  );
};
const Image = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`;

const Frame = styled.div`
  border-radius: 13px;
  border: 3px solid #093261;
  //background: url(<path-to-image>) lightgray 50% / cover no-repeat;
  //mix-blend-mode: color-dodge;
`;
export default TokenImage;
