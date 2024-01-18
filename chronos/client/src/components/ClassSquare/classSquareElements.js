import styled from "styled-components";

export const ClassSquareCont = styled.div`
    width: 95%;
    height: ${props => props.duration}%;
    border-radius: 10px;
    background: rgba(215, 65, 110, 0.5);
    background: ${props => "rgba(" + props.r + "," + props.g + "," + props.b + ", 0.5)"};

    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: absolute;
    top: ${props => props.starttoppercent}%;

    cursor: pointer;
    transition: all 0.25s;

    &:hover {
        transform: scale(1.01);
        box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;    
    }

    &:active {
        transform: scale(0.9);
        box-shadow: none;
    }

    user-select: none;
`;

export const ClassSquareBorder = styled.div`
    width: 15px;
    height: 100%;
    background: #000;
    position: absolute;
    background: linear-gradient(${props => props.clr1}, ${props => props.clr2});
`;

export const ClassSquareTitle = styled.h2`
    font-weight: normal;
    font-size: 1.25rem;
`;

export const ClassSquareTextCont = styled.div`
    margin-left: 25px;
    margin-right: 10px;
    margin-top: 15px;

    display: flex;
    flex-direction: column;
    gap: 5px;
    color: ${props => props.color};
`;

export const ClassSquareRoom = styled.p``;