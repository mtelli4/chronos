import styled from "styled-components";
import { Link, Link as LinkR } from "react-router-dom";

export const ProfilePicCont = styled(LinkR)`
    display: block;
    max-width: ${props => props.size}%;
    aspect-ratio: 1;
    border: 5px solid black;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.25s;

    &:hover {
        transform: scale(1.01);
        box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    }
`;

export const ProfilePicImg = styled.img`
    object-fit: cover;
    width: 100%;
    height: 100%;
`;