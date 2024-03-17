import styled from "styled-components";

export const HeaderBurger = styled.img`
    width: 50px;
    
    &:hover {
        transform: scale(1.1);
    }

    &:active {
        transform: scale(0.9);
    }
`;

export const HeaderBurgerLinks = styled.div`
    display: flex;
    flex-direction: column;
`;

export const HeaderBurgerNav = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    z-index: 9999;
    border: 1px solid red;
    background: #fff;
    transition: all 0.75s ease;
    transform: ${props => props.isActive ? "translateX(0)" : "translateX(200%)"};
`;

export const HeaderScreen = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    background: ${props => props.isActive ? "rgba(0, 0, 0, 0.15)" : "rgba(0, 0, 0, 0)"};
    backdrop-filter: ${props => props.isActive ? "blur(2px)" : "blur(0px)"};
    top: 0;
    left: 0;
    z-index: 9999;
    transform: ${props => props.isActive ? "scale(1)" : "scale(0)"};
    transition: transform ${props => props.isActive ? "0s" : "0.25s linear 0.55s"}, background 0.25s, backdrop-filter 0.25s;
`;