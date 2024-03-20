import styled, {keyframes} from "styled-components";
import { Link as LinkR } from "react-router-dom";

const idle = keyframes`
    0% {
        transform: translateY(1px) rotate(-3deg);
    }

    50% {
        transform: translateY(-1px) rotate(3deg);
    }

    100% {
        transform: translateY(1px) rotate(-3deg);
    }
`;

export const HeaderCont = styled.div`
    width: 95%;
    height: 10vh;
    min-height: 75px;
    max-width: 1750px;
    position: sticky;
    top: 0px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(10px);
    z-index: 9999;
    padding: 15px 40px;
    border-radius: 15px;
    align-items: center;
    display: ${props => !props.isVisible ? "none" : "flex"};
    justify-content: space-between;
    transform-origin: center;
`;

export const HeaderBurger = styled.img`
    user-select: none;
    height: 100%;
    cursor: pointer;

    &:hover {
        transform: scale(1.1);
    }

    &:active {
        transform: scale(0.9);
    }
`;

export const HeaderNav = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    gap: 20px;
    padding: 50px 0px;
    padding-bottom: 30px;
    width: 250px;
    height: 97vh;
    background: #fff;
    position: absolute;
    top: 50%;
    right: 10px;
    z-index: 99999;
    border-radius: 10px;
    transform: translate(${props => props.isActive ? "0, -50%" : "110%, -50%"});
    transition: all 0.5s cubic-bezier(.76,1.65,0,1);
`;

export const HeaderSelect = styled.select`
    outline: none;
    border : 2px solid #000;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: none;
`;

export const HeaderProfile = styled.img`
    width: 60%;
    aspect-ratio: 1;
    border-radius: 10px;
    border: 6px solid #000;
    animation: ${idle} 5s infinite;
`;

export const HeaderLinks = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    gap: 20px;
    width: 100%;
    height: 33vh;
    overflow-y: auto;
`;
 
export const HeaderLink = styled.div`
    /* text-decoration: none;
    height: 100%;
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center; */

    width: 100%;
    height: 60px;
    width: 100%;

    position: relative;
`;

export const HeaderLinkBorder = styled.div`
    width: 5px;
    height: ${props => props.selected ? "100%" : "0%"};
    background: linear-gradient(#AD6DFF, #8734DB);
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    transition: height 0.5s cubic-bezier(.76,1.65,0,0);
`;

export const HeaderLinkText = styled(LinkR)`
    display: block;
    background:  ${props => props.selected ? "linear-gradient(#AD6DFF, #8734DB)" : "#000"};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-decoration: none; 
    font-size: 1.5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const HeaderScreen = styled.div`
    width: 100%;
    height: 100vh;
    background: #000;
    opacity: ${props => props.isActive ? "0.25" : "0"};
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
    transition: transform ${props => props.isActive ? " 0s linear 0s" : " 0s linear 0.25s"}, opacity 0.25s cubic-bezier(.76,1.65,0,1);
    transform: ${props => props.isActive ? "scale(1)" : "scale(0)"};
    cursor: pointer;
`;

export const HeaderWrap = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: ${props => !props.isVisible ? "0" : props.isActive ? "100vh" : "11vh"};
    transition: all ${props => props.isActive ? " 0s linear 0s" : " 0s linear 0.25s"};
    overflow: hidden;
    z-index: 999;
`;
