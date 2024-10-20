import styled from "styled-components";
export const Box = styled.div<{ bordered?: boolean }>``;

export const AddressButton = styled.button`
    width: auto;
    font-family: "Fira Code", sans-serif;
    border-radius: 10.625px;
    background: #1d1d1d;
    border: 1px solid #1d1d1d;
    margin: 0 auto 0 auto;
    display: flex;
    align-items: center;
    img {
        margin-right: 20px;
    }
    color: #c6c6c6;
`;

export const AppLayout = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    padding: 22px;
`;

export const Button = styled.button`
    border-radius: 20px;
    border: 3px solid #268556;
    background: #68b790;
    width: auto;
    padding: 4px 50px;
    color: #08512d;
    text-transform: uppercase;
    font-size: 18px;
    letter-spacing: 3px;
`;

export const Square = styled.div`
    position: relative;
    display: block;
    overflow: hidden;
    &::before {
        content: "";
        display: block;
        width: 100%;
        padding-top: 100%;
    }
`;

export const ColorButton = styled.button<{
    success?: boolean;
    cancel?: boolean;
}>`
    // text-align: center;
    // font-size: 20px;
    // padding: 5px 20px;
    // color: #fff;
    // border-radius: 10px;
    ${(props) =>
        props.cancel &&
        "background: linear-gradient(180deg, rgba(237, 84, 84, 0.55) 0%, rgba(255, 0, 0, 0.55) 100%);"}
`;
