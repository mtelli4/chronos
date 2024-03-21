import styled from "styled-components";

export const HeaderButtonCont = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-gap: 5px;
    grid-template-columns: repeat(2, 1fr);
    cursor: pointer;
`;

export const HeaderButtonSquare = styled.div`
    height: 100%;
    aspect-ratio: 1;
    border: 4px solid #AD6DFF;
    border-radius: 5px;
    transition: all 0.75s cubic-bezier(.76,1.65,0,1) ${props => props.i * 0.1}s;
    transform: ${props => props.isHovered ? "scale(1.1) rotate(180deg)" : "scale(1) rotate(0)"};
`;

export const HeaderButtonBar = styled.div`
    height: ${props => props.isHovered ? "100%" : "5px"};
    width: ${props => props.isHovered ? "5px" : "100%"};
    background: #AD6DFF;
    border-radius: 2px;
    transition: all 0.75s cubic-bezier(.76,1.65,0,1) ${props => props.i * 0.1}s;
`;