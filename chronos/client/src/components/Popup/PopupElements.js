import styled from "styled-components";

export const PopupCont = styled.div`
    background: #fff;
    border-radius: 30px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;    
    width: ${props => props.format == "landscape" ? "90%" : "50%"};
    height: 90%;
    transition: all 0.5s cubic-bezier(.76,1.65,0,1) 0.05s;
    transform: ${props => props.isActive ? "scale(1)" : "scale(0)"};
    position: relative;
`;

export const PopupScreen = styled.div`
    position: fixed;
    background: ${props => props.isActive ? "rgba(0, 0, 0, 0.15)" : "rgba(0, 0, 0, 0)"};
    backdrop-filter: blur(2px);
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.25s, background 0s;
    transform: ${props => props.isActive ? "scale(1)" : "scale(0)"};
`;

export const PopupCloseImg = styled.img`
    width: 45%;
    height: 45%;
    object-fit: cover;
`;

export const PopupClose = styled.div`
    width: 45px;
    aspect-ratio: 1;
    background: #000;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
    transition: transform 0.25s cubic-bezier(.76,1.65,0,1);

    &:hover {
        transform: scale(1.1);
        background: linear-gradient(#EA3A3A, #F25A39);

    }

    &:active {
        transform: scale(0.9);
    }
`;