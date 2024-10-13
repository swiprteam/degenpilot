import { TokenInterface } from "~/types/interfaces";
import { Square } from "~/utils/styled";
import styled from "styled-components";
const TokenImage = ({ token }: { token: TokenInterface }) => {
    return (
        <div className="imgToken">
            <Image src={token.info.imageUrl} alt={token.info.name} />
        </div>
    );
};
const Image = styled.img`
    border-radius: 50%;
    border: 2px solid #555555;
`;

export default TokenImage;
