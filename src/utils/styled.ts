import styled from "styled-components";
export const Box = styled.div<{ bordered?: boolean }>`
    border-radius: 10px;
    border: ${(props: any) =>
        props.bordered ? "3px solid #003b71" : "1px solid #003b71"};
    background: #072045;
    box-shadow: 0px 15px 15px 0px rgba(0, 167, 220, 0.05);
    backdrop-filter: blur(7px);
`;

export const AddressButton = styled.button`
    border-radius: 10.625px;
    border: 1px solid #103368;
    background: linear-gradient(180deg, #0f2950 0%, rgba(34, 93, 182, 0) 100%);
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
    text-align: center;
    font-size: 20px;
    padding: 5px 20px;
    color: #fff;
    ${(props) =>
        props.success &&
        "background: linear-gradient(180deg, rgba(88, 197, 2, 0.55) 0%, rgba(50, 110, 3, 0.55) 100%);"}
    ${(props) =>
        props.cancel &&
        "background: linear-gradient(180deg, rgba(237, 84, 84, 0.55) 0%, rgba(255, 0, 0, 0.55) 100%);"}
`;
