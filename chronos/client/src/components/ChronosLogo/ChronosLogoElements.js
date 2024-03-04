import { styled, keyframes}  from "styled-components";
import { Link as LinkR } from 'react-router-dom';

const appearAnimImg = keyframes`
    0% {
        transform: translateY(-9%) scale(0.1) rotate(-360deg);
    }

    100% {
        transform: translateY(-9%) scale(1) rotate(0deg);
    }
`;

const appearAnimText = keyframes`
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(0%);
    }
`;

export const ChronosLogoCont = styled(LinkR)`
    width: fit-content;
    height: fit-content;
    text-decoration: none;
    color: #000;
    display: flex;
    align-items: center;
    gap: 0px;
    cursor: pointer;
    user-select: none;
`;

export const ChronosC = styled.img`
    height: ${props => props.fontsize}rem;
    transform: translateY(-9%);
    animation: ${appearAnimImg} 0.5s cubic-bezier(.76,1.65,0,1) forwards;
`;

export const ChronosTextCont = styled.div`
    height: fit-content;
    padding: 0px 30px 0px 0px;
    overflow-x: hidden;
`;

export const ChronosText = styled.span`
    display: block;
    font-size: ${props => props.fontsize}rem;
    // animation: ${appearAnimText} 0.5s cubic-bezier(.76,1.65,0,1) forwards 0.1s;
    // line-height: ${props => props.fontsize / 1.333}rem;
`;