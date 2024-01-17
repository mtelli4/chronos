import styled from "styled-components";
import { Link, Link as LinkR } from "react-router-dom";

export const ProfilePicCont = styled(LinkR)`
    display: block;
    width: ${props => props.size}%;
    aspect-ratio: 1;
    border: 5px solid black;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.25s;

    &:hover {
        transform: scale(1.01);
        box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;    }
`;

export const ProfilePicImg = styled.img`
    object-fit: cover;
    width: 100%;
    height: 100%;
`;