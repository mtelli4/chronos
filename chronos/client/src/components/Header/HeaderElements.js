import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";

export const HeaderCont = styled.div`
    width: 95%;
    height: 10vh;
    min-height: 100px;
    max-width: 1750px;
    position: sticky;
    margin: 0 auto;
    top: 0px;
    left: 0;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(20px);
    z-index: 9999;

    padding: 15px 40px;
    border-radius: 25px;
    justify-content: space-between;
    align-items: center;
    display: flex;
`;

export const HeaderNav = styled.div`
    display: flex;
    gap: 50px;
`;

export const HeaderProfile = styled.img`
    width: 75px;
    aspect-ratio: 1;
    border-radius: 10px;
    border: 5px solid #000;
`;

export const HeaderLinks = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;
 
export const HeaderLink = styled.div`
    text-decoration: none;
    height: 100%;
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const HeaderLinkBorder = styled.div`
    width: ${props => props.selected ? "100%" : "0%"};
    height: 5px;
    background: linear-gradient(#AD6DFF, #8734DB);
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    transition: width 0.5s cubic-bezier(.76,1.65,0,1);
`;

export const HeaderLinkText = styled(LinkR)`
    display: block;
    background:  ${props => props.selected ? "linear-gradient(#AD6DFF, #8734DB)" : "#000"};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-decoration: none; 
    font-size: 2rem;
`;