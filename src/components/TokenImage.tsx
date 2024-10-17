import { TokenInterface } from "~/types/interfaces";
import { Square } from "~/utils/styled";
import styled from "styled-components";
import FallbackImage from "./FallbackImage";
const TokenImage = ({ token }: { token: TokenInterface }) => {
  return (
    <div className="imgToken">
      <Image>
        <FallbackImage src={token.info.imageUrl} alt={token.info.name} />
      </Image>
    </div>
  );
};
const Image = styled.div`
  border-radius: 50%;
  border: 2px solid #555555;
  overflow: hidden;
`;

export default TokenImage;
