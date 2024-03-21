import styled from "styled-components";

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

    &:hover {   
        border: 2px solid #AD6DFF;
        color: #AD6DFF;
    }
`;

