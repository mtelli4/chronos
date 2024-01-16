import styled from "styled-components";

export const ClassSquareCont = styled.div`
    width: 95%;
    /* height: ${props => props.h}px; */
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
    /* position: absolute;
    top: ${props => (100 / props.hoursSize) * props.index + "%"}; */

    &:hover {
        transform: scale(1.01);
        box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    }
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