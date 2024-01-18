// Ici c'est le "css" de vos composants

import styled from "styled-components";

export const CardCont = styled.div`
    width: 300px;
    aspect-ratio: 2/3;
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 30px 25px;
    cursor: pointer;
    transition: all 0.25s ease-out;

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
        transform: scale(1.01);
    }
`;

export const CardTitle = styled.h2`
    width: 100%;
    font-size: 1.75rem;
    font-weight: bold;
    color: #000;
`;

export const CardSubTitle = styled.h3`
    color: #555;
    font-size: 1rem;
    font-style: italic;
    width: 100%;
    padding-left: 5px;
    margin-bottom: 15px;
`;

export const CardImg = styled.img`
    width: 100%;
    border-radius: 10px;
    max-height: 200px;
    object-fit: cover;
    margin-bottom: 15px;
`;

export const CardText = styled.p`
    color: #000;
    font-size: 1.1rem;
`;