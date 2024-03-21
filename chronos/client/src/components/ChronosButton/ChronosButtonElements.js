import styled, { keyframes } from "styled-components";

const appearAnim = keyframes`
    0% {
        transform: scaleX(0);
    }

    100% {
        transform: scaleX(100%);
    }
`;

export const ChronosButtonCont = styled.button`
    width: ${props => props.width ?  props.width : "100px"};
    height: ${props => props.height ?  props.height : ""};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 15px;

    background: #fff;
    color: #000;
    border-radius: 5px;
    border: ${props => props.border ? props.border : "2px solid #000"};
    cursor: pointer;
    transition: all 0.25s;
    font-size: ${props => props.font};
    transform-origin: left;
    animation: ${appearAnim} 0.5s cubic-bezier(.76,1.65,0,1);



    &:hover {   
        border: 2px solid #AD6DFF;
        color: #AD6DFF;
    }
`;

