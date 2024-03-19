import styled from "styled-components";

export const ButtonToggleCont = styled.button`
    width: 100%;
    aspect-ratio: 1;
    background: #000;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.25s;
    cursor: pointer;
    outline: none;
    border: none;

    &:hover {
        transform: scale(1.1);
        background: ${props => props.color ? props.color : "linear-gradient(180deg, #AD6DFF, #8734DB)"};
    }

    &:active {
        transform: scale(0.9);
    }
`;

export const ButtonToggleImg = styled.img`
    width: 60%;
`;

export const ButtonToggleText = styled.div`
    transition: all 0.5s ease;
    position: absolute;
    top: 50%;
    left: ${props => props.isVisible ? "125%" : "0"};
    transform: translateY(-50%);
    opacity: ${props => props.isVisible ? "1" : "0"};
    background: #000;
    color: #fff;
    padding: 5px 15px;
    border-radius: 5px;
    display: flex;
    z-index: -999;
    width: max-content;
`;

export const ButtonToggleWrap = styled.div`
    position: relative;
    width: 40px;
    aspect-ratio: 1;
`;