import styled from "styled-components";

export const PopupCont = styled.div`
    background: #fff;
    border-radius: 30px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;    
    width: ${props => props.format == "landscape" ? "90%" : "60%"};
    height: 90%;
    transition: all ${props => props.isActive ? "0.5s cubic-bezier(.76,1.65,0,1)" : "0.25s ease-out"} 0.05s;
    transform: ${props => props.isActive ? "scale(1)" : "scale(0)"};
    position: relative;
    overflow: ${props => props.overflow};
    max-width: 1400px;
    max-height: 750px;
    scrollbar-gutter: unset;
`;

export const PopupScreen = styled.div`
    position: fixed;
    background: ${props => props.isActive ? "rgba(0, 0, 0, 0.15)" : "rgba(0, 0, 0, 0)"};
    backdrop-filter: ${props => props.isActive ? "blur(2px)" : "blur(0px)"};
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform ${props => props.isActive ? "0s" : "0.25s linear 0.55s"}, background 0.25s, backdrop-filter 0.25s;
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
    z-index: 999999999;
    transition: transform 0.25s cubic-bezier(.76,1.65,0,1);

    &:hover {
        transform: scale(1.1);
        background: linear-gradient(#EA3A3A, #F25A39);

    }

    &:active {
        transform: scale(0.9);
    }
`;