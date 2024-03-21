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

    @media screen and (max-width: 550px) {
        width: 75%;
    }
`;

export const ButtonToggleImg = styled.img`
    width: 60%;
`;

export const ButtonToggleText = styled.div`
    position: absolute;
    top: 50%;
    left: ${props => props.isVisible ? "125%" : "0"};
    transform:  ${props => props.isVisible ? "translateY(-50%) scale(1)" : "translateY(-50%) scale(0)"};
    opacity: ${props => props.isVisible ? "1" : "0"};
    background: #000;
    color: #fff;
    padding: 5px 15px;
    border-radius: 5px;
    display: flex;
    z-index: 999999;
    width: max-content;
    transition: all 0.5s ease, z-index 0s linear 0s;

    @media screen and (max-width: 550px) {
        left: ${props => props.isVisible ? "105%" : "0"};
    }
`;

export const ButtonToggleWrap = styled.div`
    position: relative;
    width: 40px;
    aspect-ratio: 1;
`;